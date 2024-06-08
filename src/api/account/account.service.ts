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
import { UpdateAccountInput } from './dto/update-account.input';

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

      await this.minio.uploadFile(createAccountInput.photo);

      const fileLink = await this.minio.getFileLink(
        (await createAccountInput.photo).filename,
      );

      return await this.prisma.account.create({
        data: {
          ...createAccountInput,
          photo: fileLink,
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
    return account;
  }

  async getAccounts(): Promise<Account[]> {
    const accounts = await this.prisma.account.findMany();
    return accounts;
  }

  async updateAccount(
    id: string,
    updateAccountInput: UpdateAccountInput,
  ): Promise<Account> {
    //если пароль изменяется
    if (updateAccountInput.password)
      updateAccountInput.password = await encodePassword(
        updateAccountInput.password,
      );

    //если фото изменяется
    if (updateAccountInput.photo) {
      await this.minio.uploadFile(updateAccountInput.photo);

      const fileLink = await this.minio.getFileLink(
        (await updateAccountInput.photo).filename,
      );

      return await this.prisma.account.update({
        where: {
          id,
        },
        data: {
          ...updateAccountInput,
          photo: fileLink,
        },
      });
    }

    return await this.prisma.account.update({
      where: {
        id,
      },
      data: {
        login: updateAccountInput.login,
        role: updateAccountInput.role,
        name: updateAccountInput.name,
        surname: updateAccountInput.surname,
        phone: updateAccountInput.phone,
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
