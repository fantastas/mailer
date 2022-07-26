import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailerController } from './mailer.controller';
import { MailerService } from './mailer.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'imap.gmail.com',
        service: 'gmail',
        port: 993,
        secure: true,
        auth: {
          user: 'msgitara@gmail.com',
          pass: 'ywslxtfmfsowbsxc',
        },
      },
      defaults: {
        from: 'msgitara@gmail.com',
      },
    }),
  ],
  controllers: [MailerController],
  providers: [MailerService],
})
export class Mailer {}
