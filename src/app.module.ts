import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailerController } from './mailer/mailer.controller';
import { Mailer } from './mailer/mailer.module';

@Module({
  imports: [Mailer],
  controllers: [AppController, MailerController],
  providers: [AppService, Mailer],
})
export class AppModule {}
