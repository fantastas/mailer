import { Body, Controller, Post, Res } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { CreateEmail } from './email-dto';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post('send')
  public async send(@Body() createEmail: CreateEmail, @Res() res) {
    const recipients = createEmail.recipients;
    const body = createEmail.message;
    recipients.forEach(async (recipient) => {
      await this.mailerService.sendMail({
        to: recipient,
        subject: 'test',
        html: body,
      });
    });
    res.send(recipients);
  }
}
