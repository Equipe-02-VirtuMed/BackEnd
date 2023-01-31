import { PrismaClient } from '@prisma/client';
import { handleError } from 'src/utils/handle-error.util';
import { CreateUserDto } from '../dto/create-user.dto';
import { GetUserByResidencyDto, UpdateUserRole } from '../dto/get-user.dto';
import { UpdateMyAccountDto } from '../dto/update-my-account.dto';
import { UpdateMyPasswordDto } from '../dto/update-my-password.dto';
import { UserEntity } from '../entity/user.entity';

export class UserRepository extends PrismaClient {
  async createUser(data: CreateUserDto) {
    const createUser = await this.user.create({ data });
    delete createUser.password;
    return createUser;
  }

  async findAllUser(): Promise<UserEntity[]> {
    return this.user.findMany();
  }

  async findAllUsersResidency(residency: string): Promise<UserEntity[]> {
    const all = this.user.findMany();
    return this.user
      .findMany({
        where: {
          residency: {
            contains: residency,
            mode: 'insensitive',
          },
        },
      })
      .catch(handleError);
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    return this.user.findUnique({ where: { email } }).catch(handleError);
  }

  async findUserById(id: string): Promise<UserEntity> {
    return this.user.findUnique({ where: { id } }).catch(handleError);
  }

  async findByToken(recoverPasswordToken: string): Promise<UserEntity> {
    return this.user
      .findFirst({ where: { recoverPasswordToken } })
      .catch(handleError);
  }

  async updateMyAccount(updateMyAccountDto: UpdateMyAccountDto, id: string) {
    const data = { ...updateMyAccountDto };
    return this.user.update({ where: { id }, data }).catch(handleError);
  }

  // async updateUserRoleById(id: string, role) {
  //   return this.user
  //     .update({
  //       where: { id },
  //       data: { role },
  //     })
  //     .catch(handleError);
  // }

  async updateUserResidencyById(
    id: string,
    updateUserResidency: GetUserByResidencyDto,
  ) {
    const data = { ...updateUserResidency };
    return this.user.update({ where: { id }, data }).catch(handleError);
  }

  async updateMyPassword(updateMyPasswordDto: UpdateMyPasswordDto, id: string) {
    const data = { ...updateMyPasswordDto };
    return this.user.update({ where: { id }, data }).catch(handleError);
  }

  async updateRecoveryPassword(id, recoverPasswordToken) {
    return this.user
      .update({
        where: { id },
        data: { recoverPasswordToken },
      })
      .catch(handleError);
  }

  async updatePassword(id: string, password: string): Promise<UserEntity> {
    const updatedUser = await this.user.update({
      where: {
        id,
      },
      data: {
        recoverPasswordToken: null,
        password,
      },
    });

    delete updatedUser.password;

    return updatedUser;
  }

  async deleteMyAccount(id: string) {
    return this.user.delete({ where: { id } }).catch(handleError);
  }
}
