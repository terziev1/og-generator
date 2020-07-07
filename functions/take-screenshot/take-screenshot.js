const chromium = require('chrome-aws-lambda');
const puppeteer = require('puppeteer');
const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');

// Get the URL and the slug segment from it
const url = process.argv[2];
const segments = url.split('/');
const slug = segments[segments.length-2];

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url + 'sharing');
  await page.setViewport({
  	width: 600,
  	height: 315,
  	deviceScaleFactor: 2
  });
  await page.screenshot({path: slug + '.png'});
  await browser.close();

  await imagemin([slug + '.png'], 'build', {
	  plugins: [
	    imageminPngquant({quality: '75-90'})
	  ]
	});
})();
exports.handler = async (event, context) => {
    // const browser = await puppeteer.launch();
    // const page = await browser.newPage();
    // await page.goto(url + 'sharing');
    // await page.setViewport({
    //     width: 600,
    //     height: 315,
    //     deviceScaleFactor: 2
    // });
    // await page.screenshot({path: slug + '.png'});
    // await browser.close();

    // await imagemin([slug + '.png'], 'build', {
    //     plugins: [
    //       imageminPngquant({quality: '75-90'})
    //     ]
    //   });
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

    // const screenshot = await page.screenshot({ encoding: 'binary' });

    // await browser.close();

    // return {
    //     statusCode: 200,
    //     body: JSON.stringify({
    //         message: `Complete screenshot of ${pageToScreenshot}`,
    //         buffer: screenshot
    //     })
    // }

}
