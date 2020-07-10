const chromium = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-serverless');
const renderSocialImage = require('puppeteer-social-image');

exports.handler = async (event, context) => {
    const pageToScreenshot = JSON.parse(event.body).pageToScreenshot;

    if (!pageToScreenshot) return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Page URL not defined' })
    }

    const browser = await renderSocialImage({
        template: "basic",
        templateParams: {
          imageUrl:
            "https://images.unsplash.com/photo-1557958114-3d2440207108?w=1950&q=80",
          title: "Hello, world"
        },
        browser: await puppeteer.launch({

                    args: chromium.args,
                    defaultViewport: chromium.defaultViewport,
                    executablePath: await chromium.executablePath,
                    headless: chromium.headless,

        })
      });
    const page = await browser.newPage();

    await page.goto(pageToScreenshot, { waitUntil: 'networkidle2' });

    const screenshot =  await page.screenshot({})

    await browser.close();

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: `Complete screenshot of ${pageToScreenshot}`,
            buffer: screenshot
        })
    }


}

