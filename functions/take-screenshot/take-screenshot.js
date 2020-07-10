const chromium = require('chrome-aws-lambda');
const renderSocialImage = require('puppeteer-social-image');

exports.handler = async (event, context) => {
    const pageToScreenshot = JSON.parse(event.body).pageToScreenshot;

    if (!pageToScreenshot) return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Page URL not defined' })
    }

    const page = await renderSocialImage({
        templateBody: '<div class="Main">Hello, {{name}}!</div>',
        templateStyles: ".Main { color: blue; }",
        templateParams: {
          name: "Jane"
        },
        browser: await chromium.puppeteer.launch({

                    args: chromium.args,
                    defaultViewport: chromium.defaultViewport,
                    executablePath: await chromium.executablePath,
                    headless: chromium.headless,

        })
      });

    // const page = await browser.newPage();

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

