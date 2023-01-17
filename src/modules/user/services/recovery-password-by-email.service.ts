import { Injectable } from '@nestjs/common';
import { UserRepository } from './../repository/user.repository';
import * as crypto from 'crypto';
import { MailService } from 'src/modules/mails/mail.service';

@Injectable()
export class RecoveryPasswordByEmail {
  constructor(
    private userRepository: UserRepository,
    private mailService: MailService,
  ) {}

  async execute(email: string) {
    const userExists = await this.userRepository.findUserByEmail(email);
    if (!userExists) {
      return {
        status: 400,
        data: {
          message: 'Email not found.',
        },
      };
    }

    const recoverPasswordToken = crypto.randomBytes(32).toString('hex');

    const { id } = userExists;

    const userUpdated = await this.userRepository.updateRecoveryPassword(
      id,
      recoverPasswordToken,
    );

    await this.mailService.sendUserConfirmation(userUpdated);

    return {
      status: 200,
      data: {
        message: 'Email sent.',
      },
    };
  }
}
