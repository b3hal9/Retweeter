const pupperteer = require("puppeteer");

let browser = null;

let page = null;

async function bot(
  username,
  password ,
  keyword
) {
  browser = await pupperteer.launch({ headless: false });
  page = await browser.newPage();
  page.setViewport({
    width: 1280,
    height: 800,
    isMobile: false,
  });
  await page.goto("https://twitter.com/login", { waitUntil: "networkidle2" });
  await page.type('input[name="session[username_or_email]"]', username, {
    delay: 400,
  });
  await page.type('input[name="session[password]"]', password, { delay: 400 });
  await page.click('div[data-testid="LoginForm_Login_Button"]');

  await page.waitFor('input[data-testid="SearchBox_Search_Input"]');
  await page.type('input[data-testid="SearchBox_Search_Input"]', keyword, {
    delay: 400,
  });
  await page.keyboard.press("Enter");
  await page.waitFor(3000);

  let tweets = new Set();
  try {
    let prevHeight;

    for (let i = 0; i < 5; i++) {
      const elementHandles = await page.$$(
        "a.r-111h2gw.r-1loqt21.r-1q142lx.r-1qd0xha.r-a023e6.r-16dba41.r-ad9z0x.r-bcqeeo.r-3s2u2q.r-qvutc0.css-4rbku5.css-18t94o4.css-901oao"
      );
      const propertyJsHandles = await Promise.all(
        elementHandles.map((handle) => handle.getProperty("href"))
      );
      const urls = await Promise.all(
        propertyJsHandles.map((handle) => handle.jsonValue())
      );

      urls.forEach((item) => tweets.add(item));

      prevHeight = await page.evaluate("document.body.scrollHeight"); //get current page height
      await page.evaluate("window.scrollTo(0,document.body.scrollHeight)"); //scroll to bottm of current height
      await page.waitForFunction(`document.body.scrollHeight> ${prevHeight}`); //updating document height until it's greater than prev height
      await page.waitFor(4000);
    }
  } catch (e) {
    console.log(e);
  }
 

  const urls = Array.from(tweets);
  console.log(urls);
  for (let i = 0; i < urls.length; i++) {
    try {
      const tweet = urls[i];
      await page.goto(`${tweet}`);
      await page.waitFor(4000);
      // await page.click(
      //   'a[class="r-111h2gw r-1loqt21 r-1q142lx r-1qd0xha r-a023e6 r-16dba41 r-ad9z0x r-bcqeeo r-3s2u2q r-qvutc0 css-4rbku5 css-18t94o4 css-901oao"]'
      // );
      // await page.waitFor(2000);
      await page.click('div[data-testid="retweet"]'); //retweet button
      await page.waitFor(4000);
      await page.click('div[data-testid="retweetConfirm"]'); //retweetConfirm button
      await page.waitFor(6000);
      await page.goBack();
    } catch (e) {
      console.log(e);
    }
  }
  browser.close();
}
// bot();

module.exports = bot;
