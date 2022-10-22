import { Body, Controller, Post, Res } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { CreateEmail } from './email-dto';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post('send')
  public async send(@Body() createEmail: CreateEmail, @Res() res) {
    const recipient = createEmail.recipients;
    const prnr = createEmail.prnr;
    const validation_title = createEmail.validation_title;
    const svorioValidacija = createEmail.svorioValidacija;
    const kainosValidacija = createEmail.kainosValidacija;
    const body = createEmail.message;
    const sender_email = 'sender@vdv.stat.gov.lt';
    const company = 'test_company';
    const year = '2022';
    const month = 'rugpjūčio';
    const intra = 'Įvežimas UPS-02';
    const sender_name = 'Vardenis Pavardenis';
    console.log(recipient, body);
    recipient.forEach(async (recipient, i) => {
      const message = body[i];
      await this.mailerService.sendMail({
        // to: recipient,
        to: 'msgitara@gmail.com', //new
        subject: 'UPS',
        html: `
                <!DOCTYPE html>
        <html>
        <head>
        <title>Page Title</title>
        </head>
        <body style="padding-left: 10px;">

        <pre style="font-family: inherit;">
        Laba diena,
        "${recipient}"
        "${prnr}"
        "${validation_title}"
        "${kainosValidacija}"
        "${svorioValidacija}"
        norėtume patikslinti <b>"${company}"</b> ${year}m. <b>${month}</b>
        Intrastato ataskaitos "${intra}" <b>1</b> eilutėje nurodytos prekės
        <b>kiekio</b> (pagal atitinkamą matavimo vienetą) ir <b>masės neto</b>
        duomenis, nes ataskaitoje pateiktas abejotinas prekės svoris.

        Būtume dėkingi, jei patikrintumėte, ar pateikti duomenys yra teisingi.

        Prašome skubiai susisiekti su mumis el. paštu <a href="mailto:${sender_email}">${sender_email}</a> arba telefonu
        863603296 ir patikslinti duomenis arba pranešti, kad pateikti duomenys yra teisingi.

        Dėkojame už bendradarbiavimą.

        Pagarbiai
        ${sender_name}

        Lietuvos statistikos departamento
        Tarptautinės prekybos ir užsienio investicijų skyrius
        tel. +370 060 03 296
        el. p. ${sender_email}
        </pre>
        <div style="display: flex;align-items: center;">
        <img style="max-height: 50px;"src="data:image/png;base64,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">
        <div style="border-left: 1px solid black; margin: 0px 10px"></div>
        <div style="">
         <pre style="border-left: 1px solid black;font-family: inherit">

         Lietuvos statistikos departamentas
         Gedimino pr. 29, LT-01500 Vilnius
         <a href="www.stat.gov.lt">www.stat.gov.lt</a>
         osp.stat.gov.lt

        </pre>
        </div>
        </div>
        </body>
        </html>`,
      });
      // console.log(message);
    });
    res.send(recipient);
  }
}
