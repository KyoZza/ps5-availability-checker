import { JSDOM } from 'jsdom';
import { sendMail, messages } from '../mailer/index.js';

function logSuccessfulCheck(url) {
  console.log(`Checked {${url}}: ${new Date().toLocaleTimeString()}`);
}
function logFailedCheck(url, error) {
  const err = error.statusCode
    ? `Status code ${error.statusCode}`
    : error.message;

  console.error(
    `Check failed for {${url}}: ${new Date().toLocaleTimeString()} : ${err}`
  );
}

async function getDomFromURL(url) {
  return JSDOM.fromURL(url);
}

export async function checkSony() {
  const URL = 'https://www.sony.jp/playstation/ps5/';

  try {
    const dom = await getDomFromURL(URL);
    const { document } = dom.window;

    const checkEl = document.querySelector(
      '.c5-border--light.s5-general--mb30'
    );
    const checkText = '今後の販売が決まり次第、本ページにてご案内いたします。';

    if (!checkEl || !checkEl.textContent.includes(checkText))
      sendMail(messages.contentChanged(URL));

    logSuccessfulCheck(URL);
  } catch (error) {
    logFailedCheck(URL, error);
    sendMail(messages.scrapeError(error.statusCode, URL));
  }
}

export async function checkYodobashi() {
  const URL = 'https://www.yodobashi.com/store/180039/';

  try {
    const dom = await getDomFromURL(URL);
    const { document } = dom.window;

    const checkEl = document.querySelector(
      'div[style="padding:20px 10px 13px 10px; border: solid 2px #222222; margin-bottom:30px; "] > p:last-child'
    );
    const checkText = 'ヨドバシカメラ各店での販売は未定です。';

    if (!checkEl || !checkEl.textContent.includes(checkText))
      sendMail(messages.contentChanged(URL));

    logSuccessfulCheck(URL);
  } catch (error) {
    logFailedCheck(URL, error);
    sendMail(messages.scrapeError(error.statusCode, URL));
  }
}

export async function checkBicCamera() {
  const URL = 'https://www.biccamera.com/bc/c/sale/special/ps5/index.html';

  try {
    const dom = await getDomFromURL(URL);
    const { document } = dom.window;

    const checkEl = document.querySelector(
      'span[style="font-weight:bold;color:#e60012;font-size:110%;"]'
    );
    const checkText =
      'PlayStation 5本体 抽選受付は終了しました。ご応募ありがとうございました。';

    if (!checkEl || !checkEl.textContent.includes(checkText))
      sendMail(messages.contentChanged(URL));

    logSuccessfulCheck(URL);
  } catch (error) {
    logFailedCheck(URL, error);
    sendMail(messages.scrapeError(error.statusCode, URL));
  }
}

export async function checkAmazon() {
  const URL1 = 'https://www.amazon.co.jp/-/en/dp/B08GGGBKRQ';
  const URL2 = 'https://www.amazon.co.jp/-/en/dp/B08GGGCH3Y';
  const getCheckEl = (document) =>
    document.querySelector('#priceblock_ourprice_row');

  try {
    const dom = await getDomFromURL(URL1);
    const { document } = dom.window;

    if (getCheckEl(document)) sendMail(messages.contentChanged(URL1));

    logSuccessfulCheck(URL1);
  } catch (error) {
    logFailedCheck(URL, error);
    sendMail(messages.scrapeError(error.statusCode, URL1));
  }

  try {
    const dom = await getDomFromURL(URL2);
    const { document } = dom.window;

    if (getCheckEl(document)) sendMail(messages.contentChanged(URL2));

    logSuccessfulCheck(URL2);
  } catch (error) {
    logFailedCheck(URL, error);
    sendMail(messages.scrapeError(error.statusCode, URL2));
  }
}

export async function checkRakuten() {
  const URL =
    'https://books.rakuten.co.jp/rb/16462859/?bkts=1&l-id=search-c-item-text-01';

  try {
    const dom = await getDomFromURL(URL);
    const { document } = dom.window;

    const checkEl = document.querySelector('font[size="+3"][color="red"] > b');
    const checkText = '次回入荷は未定となっております。';

    if (!checkEl || !checkEl.textContent.includes(checkText))
      sendMail(messages.contentChanged(URL));

    logSuccessfulCheck(URL);
  } catch (error) {
    logFailedCheck(URL, error);
    sendMail(messages.scrapeError(error.statusCode, URL));
  }
}

export function checkWebsites() {
  checkSony();
  checkYodobashi();
  checkBicCamera();
  checkAmazon();
  checkRakuten();
}
