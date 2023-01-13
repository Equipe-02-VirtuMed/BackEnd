import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class DeleteMyAccountService {
  constructor(private userRep: UserRepository) {}

  async execute(id: string) {
    await this.userRep.deleteMyAccount(id);

    return { status: 200, data: { message: 'Account has been deleted.' } };
  }
}
