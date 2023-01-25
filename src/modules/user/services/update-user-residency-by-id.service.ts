import { Injectable } from '@nestjs/common';
import { GetUserByResidencyDto } from '../dto/get-user.dto';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UpdateUserResidencyById {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string, updateUserResidency: GetUserByResidencyDto) {
    const userExists = await this.userRepository.findUserById(id);

    if (!userExists) {
      return {
        status: 400,
        data: { message: 'User not found' },
      };
    }

    const updatedUser = await this.userRepository.updateUserResidencyById(
      id,
      updateUserResidency,
    );

    return {
      status: 200,
      data: updatedUser,
    };
  }
}
