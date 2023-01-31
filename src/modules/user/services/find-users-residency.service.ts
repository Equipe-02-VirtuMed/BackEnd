import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class FindAllUsersResidency {
  constructor(private userRepository: UserRepository) {}

  async execute(residency: string) {
    const allUsers = await this.userRepository.findAllUsersResidency(residency);

    if (!allUsers) {
      return {
        status: 400,
        data: { message: 'User not found' },
      };
    }

    return {
      status: 200,
      data: allUsers,
    };
  }
}
