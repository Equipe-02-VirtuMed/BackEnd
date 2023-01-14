import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../user/entity/user.entity';

type DataResponse = {
  local: string;
  message: string;
};

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: UserEntity) {
    const { email, name, recoverPasswordToken } = user;
    const url = `http://localhost:3333/recovery-password?token=${recoverPasswordToken}`;
    console.log(url);
    await this.mailerService.sendMail({
      to: email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Reset Password!',
      template: './send', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        name: name,
        url,
      },
    });
  }
}
