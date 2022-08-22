import { Body, Controller, Post, Res } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { CreateEmail } from './email-dto';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post('send')
  public async send(@Body() createEmail: CreateEmail, @Res() res) {
    const recipient = createEmail.recipients;
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
        to: recipient,
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
<img style="max-height: 50px;"src="../img/met_logo1.jpeg">
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
