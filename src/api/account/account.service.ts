import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateAccountInput } from './dto/create-account.input';
import { Account } from './account.entity';
import { AccountExistError } from 'src/errors/account-exist.error';
import { encodePassword } from 'src/utils/bcrypt';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { MinioService } from 'src/utils/minio/minio.service';
import { FileUpload } from 'graphql-upload/GraphQLUpload.js';

@Injectable()
export class AccountService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly minio: MinioService,
  ) {}

  async createAccount(
    createAccountInput: CreateAccountInput,
  ): Promise<Account> {
    try {
      await createAccountInput.photo;
      const password = await encodePassword(createAccountInput.password);

      await this.uploadFile(createAccountInput.photo);

      return await this.prisma.account.create({
        data: {
          ...createAccountInput,
          photo: (await createAccountInput.photo).filename,
          password,
        },
      });
    } catch (error) {
      switch (error.code) {
        case 'P2002':
          throw new AccountExistError(createAccountInput.login);
        default:
          throw error;
      }
    }
  }

  async getAccountById(id: string): Promise<Account> {
    const account = await this.prisma.account.findUnique({
      where: {
        id,
      },
    });
    account.photo = await this.minio.getFileLink(account.photo);
    return account;
  }

  async uploadFile(photo: FileUpload) {
    const file: FileUpload = await photo;

    const { createReadStream, filename, mimetype } = file;

    const buffer = await this.streamToBuffer(createReadStream());

    const minioFileSave = await this.minio.uploadFile(
      filename,
      buffer,
      mimetype,
    );
  }

  async getAccounts(): Promise<Account[]> {
    const accounts = await this.prisma.account.findMany();
    for (let i = 0; i < accounts.length; i++) {
      accounts[i].photo = await this.minio.getFileLink(accounts[i].photo);
    }
    return accounts;
  }

  async updateAccount(
    id: string,
    account: Partial<CreateAccountInput>,
  ): Promise<Account> {
    //если пароль изменяется
    if (account.password)
      account.password = await encodePassword(account.password);

    //если фото изменяется
    if (account.photo) {
      const filename = (await account.photo).filename;
      await this.uploadFile(account.photo);

      return await this.prisma.account.update({
        where: {
          id,
        },
        data: {
          ...account,
          photo: filename,
        },
      });
    }

    return await this.prisma.account.update({
      where: {
        id,
      },
      data: {
        login: account.login,
        role: account.role,
        name: account.name,
        surname: account.surname,
        phone: account.phone,
      },
    });
  }

  async deleteAccount(id: string): Promise<Account> {
    return await this.prisma.account.delete({
      where: {
        id,
      },
    });
  }

  private async streamToBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];
      stream.on('data', (chunk) => chunks.push(chunk));
      stream.on('end', () => resolve(Buffer.concat(chunks)));
      stream.on('error', reject);
    });
  }
}
