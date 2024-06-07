import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateAccountInput } from './dto/create-account.input';
import { Account } from './account.entity';
import { AccountExistError } from 'src/errors/account-exist.error';
import { encodePassword } from 'src/utils/bcrypt';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { MinioService } from 'src/utils/minio/minio.service';

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
      const password = await encodePassword(createAccountInput.password);
      const { createReadStream, filename } = await createAccountInput.photo;

      const writeStream = createWriteStream(
        join(process.cwd(), `./src/upload/${filename}`),
      );

      createReadStream().pipe(writeStream);
      await this.minio.createBucketIfNotExist();
      console.log('after bucket');
      const minioFileSave = await this.minio.uploadFile(
        filename,
        `./src/upload/${filename}`,
      );
      console.log('after file');

      if (!minioFileSave) {
        throw new BadRequestException('Could not save image');
      }
      console.log('after bucket');

      return await this.prisma.account.create({
        data: {
          ...createAccountInput,
          photo: filename,
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
    return await this.prisma.account.findUnique({
      where: {
        id,
      },
    });
  }

  async getAccounts(): Promise<Account[]> {
    return await this.prisma.account.findMany();
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
      const { createReadStream, filename } = await account.photo;

      const writeStream = createWriteStream(
        join(process.cwd(), `./src/upload/${filename}`),
      );

      createReadStream().pipe(writeStream);
      try {
        await new Promise((resolve) => writeStream.on('finish', resolve));

        return await this.prisma.account.update({
          where: {
            id,
          },
          data: {
            ...account,
            photo: filename,
          },
        });
      } catch (error) {
        throw new BadRequestException('Could not save image');
      }
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
}
