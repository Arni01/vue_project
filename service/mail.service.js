const nodemailer = require('nodemailer');
const config = require('config');
const fs = require('fs');

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.get('smtp-host'),
      port: config.get('smtp-port'),
      secure: false,
      auth: {
        user: config.get('smtp-user'),
        pass: config.get('smtp-password'),
      },
    });
  }

  getHTMLMAil(link) {
    let htmlMail = fs.readFileSync('./sendMailNode.html', 'utf8');
    htmlMail = htmlMail.replace('#LINK', link);
    return htmlMail;
  }

  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: config.get('smtp-user'),
      to,
      subject: 'Активация почты',
      text: '',
      html: this.getHTMLMAil(link),
    });
  }
}

module.exports = new MailService();
