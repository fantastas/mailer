import { Controller, Post } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post('send')
  public async send() {
    await this.mailerService.sendMail({
      to: 'msgitara@gmail.com',
      subject: 'Palantir',
      html: `<b>hello Marius</b>`,
    });
  }
}
