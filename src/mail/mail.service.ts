import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) { }

  async sendMail(to: string, from: string, subject: string, mail: string) {
    await this.mailerService.sendMail({
      to: to,
      from:from,
      subject: subject,
      template: mail,
      text:mail,
      html:`<code>${mail}</code>`
    });
  }
}
