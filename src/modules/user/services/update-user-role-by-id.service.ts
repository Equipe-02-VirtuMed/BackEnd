import { Injectable } from '@nestjs/common';
import { UpdateUserRole } from '../dto/get-user.dto';
import { UserRepository } from './../repository/user.repository';

@Injectable()
export class UpdateUserRoleById {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string, updateUserRole: UpdateUserRole) {
    const userExists = await this.userRepository.findUserById(id);

    if (!userExists) {
      return {
        status: 400,
        data: { message: 'User not found' },
      };
    }

    const updatedUser = await this.userRepository.updateUserRoleById(
      id,
      updateUserRole,
    );

    return {
      status: 200,
      data: updatedUser,
    };
  }
}
