import http from 'http';
import cron from 'node-cron';
import { sendMail } from './mailer/index.js';
import { checkWebsites } from './scraping/index.js';

http.createServer(onRequest).listen(process.env.PORT || 6000);

cron.schedule('0 0 */1 * * *', () => {
  checkWebsites();
});

cron.schedule('0 6 * * friday', () => {
  sendMail('Weekly mail');
});

sendMail('Heroku Project online');
checkWebsites();
