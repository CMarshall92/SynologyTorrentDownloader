import { config } from 'dotenv';
config();
import puppeteer from 'puppeteer';

const configureSession = async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });

  const page = await browser.newPage();
  await page.goto(`https://${process.env.QUICK_CONNECT_ID}.quickconnect.to/`);
  await page.setViewport({width: 1080, height: 1024});

  return {
    page,
    browser
  }
}

const removeSecurityLayers = async (page) => {
  await new Promise(async (resolve) => {
    await page.waitForSelector("div[id='sds-wallpaper']");

    setTimeout(async () => {
      await page.evaluate(() => {
        document.querySelector("div[id='sds-wallpaper']").remove();
      });

      resolve();
    }, 5000);
  });
}

const handleLogin = async (page) => {
  // Await Login Prompt
  const usernameInput =  "input[name='username']";
  await page.waitForSelector(usernameInput);
  await page.type(usernameInput, process.env.SYNOLOGY_USERNAME);

  const loginButtonUsernameScreen = "div[class='login-btn']";
  await page.click(loginButtonUsernameScreen);

  const passwordInput = "input[name*='current-password']";
  await page.waitForSelector(passwordInput);
  await page.type(usernameInput, process.env.SYNOLOGY_PASSWORD);

  const loginButtonPasswordScreen = "div[class='login-btn']";
  await page.click(loginButtonPasswordScreen);

  await removeSecurityLayers(page);
}

const openDownloadStation = async (page) => {
  const downloadStationIcon = "li[aria-label='Download Station']";
  await page.waitForSelector(downloadStationIcon);
  await page.click(downloadStationIcon);
}

const addTorrent = async (page) => {
  const addDownloadIcon = "button[aria-label='Create download task via file upload']";
  await page.waitForSelector(addDownloadIcon);
  await page.click(addDownloadIcon);
}

(async () => {
  const { page, browser } = await configureSession();
  await handleLogin(page);
  await openDownloadStation(page);
  await addTorrent(page);

  // await browser.close();
})();