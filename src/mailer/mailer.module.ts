import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailerController } from './mailer.controller';
import { MailerService } from './mailer.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.hostinger.com',
        port: 465,
        secure: true,
        auth: {
          user: 'do-not-reply@scobo.lt',
          pass: 'Slaptazodisscobo2',
        },
      },
      defaults: {
        from: 'do-not-reply@scobo.lt',
      },
    }),
  ],
  controllers: [MailerController],
  providers: [MailerService],
})
export class Mailer {}
