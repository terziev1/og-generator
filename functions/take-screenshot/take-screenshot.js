const chromium = require('chrome-aws-lambda');

exports.handler = async (event, context) => {

    const pageToScreenshot = JSON.parse(event.body).pageToScreenshot;

    if (!pageToScreenshot) return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Page URL not defined' })
    }

    const browser = await chromium.puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: chromium.headless,
    });

    const page = await browser.newPage();

    await page.goto(pageToScreenshot, { waitUntil: 'networkidle2' });

    const screenshot =  await page.screenshot({
        type:'svg',
        clip: {
          x: 0,
          y: 0,
          width: 1200,
          height: 600,
        },
      })

    fs.writeFileSync('og-img', screenshot);
    await browser.close();

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: `Complete screenshot of ${pageToScreenshot}`,
            buffer: screenshot
        })
    }

}