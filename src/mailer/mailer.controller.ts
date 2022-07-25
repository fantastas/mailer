import { Body, Controller, Post, Res } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { CreateEmail } from './email-dto';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post('send')
  public send(@Body() createEmail: CreateEmail, @Res() res) {
    const recipients = createEmail.recipients;
    const body = createEmail.body;
    console.log(recipients[0]);
    console.log('sss');

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
