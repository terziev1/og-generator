const chromium = require('chrome-aws-lambda');
import puppeteer from "puppeteer-serverless";
import renderSocialImage from "puppeteer-social-image";

exports.handler = async (event, context) => {

    // const pageToScreenshot = JSON.parse(event.body).pageToScreenshot;

    // if (!pageToScreenshot) return {
    //     statusCode: 400,
    //     body: JSON.stringify({ message: 'Page URL not defined' })
    // }

    // const browser = await chromium.puppeteer.launch({
    //     args: chromium.args,
    //     defaultViewport: chromium.defaultViewport,
    //     executablePath: await chromium.executablePath,
    //     headless: chromium.headless,
    // });

    // const page = await browser.newPage();

    // await page.goto(pageToScreenshot, { waitUntil: 'networkidle2' });

    // const screenshot =  await page.screenshot({
    //     clip: {
    //       x: 0,
    //       y: 0,
    //       width: 1200,
    //       height: 600,
    //     },
    //   })

    // await browser.close();
   return await renderSocialImage({
        template: "basic",
        templateParams: {
          imageUrl:
            "https://images.unsplash.com/photo-1557958114-3d2440207108?w=1950&q=80",
          title: "Hello, world"
        },
        browser: await puppeteer.launch({})
      });


}

