import { transporter, getMailOptions } from './config.js';

export const messages = {
  contentChanged: (url) => `Content for ${url} has changed.`,
  scrapeError: (statusCode, url) =>
    `${url} responded with status code ${statusCode}.`,
};

export function sendMail(text) {
  const subject = 'Update from PS5 Lottery checker';

  transporter.sendMail(getMailOptions(subject, text), function (error, info) {
    if (error) {
      console.error(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
