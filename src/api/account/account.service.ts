import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateAccountInput } from './dto/create-account.input';
import { Account } from './account.entity';
import { AlreadyExistError } from 'src/errors/already-exist.error';
import { encodePassword } from 'src/utils/bcrypt';
import { MinioService } from 'src/utils/minio/minio.service';
import { UpdateAccountInput } from './dto/update-account.input';
import { SmsService } from 'src/utils/sms.service';
import { NotFoundError } from 'src/errors/not-found.error';
import { ChangePasswordInput } from './dto/change-password.input';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AccountService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly minio: MinioService,
    private readonly sms: SmsService,
    private readonly authService: AuthService,
  ) {}

  async createAccount(
    createAccountInput: CreateAccountInput,
  ): Promise<Account> {
    try {
      await createAccountInput.photo;
      const password = await encodePassword(createAccountInput.password);

      await this.minio.uploadPhoto(createAccountInput.photo);

      const fileLink = await this.minio.getFileLink(
        (await createAccountInput.photo).filename,
      );
      console.log(fileLink);

      await this.sms.sendSms(
        createAccountInput.phone,
        `Для авторизации в Липецком КВН, используйте логин: ${createAccountInput.login} и пароль: ${createAccountInput.password}`,
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
          throw new AlreadyExistError('Account');
        default:
          throw error;
      }
    }
  }

  async getAccountById(token: string): Promise<Account> {
    try {
      const payload = await this.authService.decodeToken(token);
      return await this.prisma.account.findUniqueOrThrow({
        where: {
          id: payload.id,
        },
      });
    } catch (error) {
      throw new NotFoundError('Account');
    }
  }

  async getAccounts(): Promise<Account[]> {
    try {
      return await this.prisma.account.findMany();
    } catch (error) {
      throw new NotFoundError('Account');
    }
  }

  async updateAccount(
    id: string,
    updateAccountInput: UpdateAccountInput,
  ): Promise<Account> {
    try {
      //если пароль изменяется
      if (updateAccountInput.password)
        updateAccountInput.password = await encodePassword(
          updateAccountInput.password,
        );

      //если фото изменяется
      if (updateAccountInput.photo) {
        await this.minio.uploadPhoto(updateAccountInput.photo);

        const fileLink = await this.minio.getFileLink(
          (await updateAccountInput.photo).filename,
        );
        console.log(fileLink);

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
          password: updateAccountInput.password,
        },
      });
    } catch (error) {
      throw new NotFoundError('Account');
    }
  }

  async deleteAccount(id: string): Promise<Account> {
    try {
      return await this.prisma.account.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new NotFoundError('Account');
    }
  }

  async changePassword(input: ChangePasswordInput) {
    try {
      const account = await this.authService.validateAccount({
        login: input.login,
        password: input.oldPassword,
      });

      const newPassword = await encodePassword(input.newPassword);

      return await this.updateAccount(account.id, {
        password: newPassword,
      });
    } catch (error) {
      throw new NotFoundError('Account');
    }
  }
}
