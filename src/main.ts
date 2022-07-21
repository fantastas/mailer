/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
// import { ServiceAccount } from 'firebase-admin';
// import { ConfigService } from '@nestjs/config';
// import * as admin from 'firebase-admin';

dotenv.config();
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

 
// admin.initializeApp({
//     credential: admin.credential.cert({
//         projectId: process.env.FIREBASE_PROJECT_ID, // I get no error here
//         clientEmail: process.env.FIREBASE_CLIENT_EMAIL, // I get no error here
//         privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') // NOW THIS WORKS!!!
//     }),
//     databaseURL: process.env.FIREBASE_DATABASE_URL
//   });
  
  app.enableCors();
  await app.listen(process.env.PORT || 8080);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
