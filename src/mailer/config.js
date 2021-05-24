import mailer from 'nodemailer';
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

export const transporter = mailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PW,
  },
});

export const getMailOptions = (subject, text) => ({
  from: process.env.MAIL_USER,
  to: process.env.MAIL_TO,
  subject,
  text,
});
