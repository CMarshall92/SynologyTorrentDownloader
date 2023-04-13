const puppeteer = require('puppeteer');

const configureSession = async (options) => {
  console.log('Configuring...');

  const browser = await puppeteer.launch(options);

  const page = await browser.newPage();
  await page.goto(`https://${process.env.QUICK_CONNECT_ID}.quickconnect.to/`);
  await page.setViewport({ width: 1024, height: 800 });

  console.log('Configured');

  return {
    page,
    browser
  }
}

const wait = (timeout = 5000) => new Promise((resolve) => {
  setTimeout(() => { resolve(); }, timeout);
});

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
  console.log('Logging In...');

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

  console.log('Logged In');
}

const openDownloadStation = async (page) => {
  console.log('Opening Download Station...');

  const downloadStationIcon = "li[aria-label='Download Station']";
  await page.waitForSelector(downloadStationIcon);
  await page.click(downloadStationIcon);

  console.log('Download Station Open');
}

const addTorrent = async (page, magnetLink) => {
  console.log('Adding Torrent...');

  await wait(2000);

  const addDownloadIcon = "button[aria-label='Create download task via file upload']";
  await page.waitForSelector(addDownloadIcon);
  await page.click(addDownloadIcon);

  const enterUrlButton = "li[aria-label='Enter URL']";
  await page.waitForSelector(enterUrlButton);
  await page.click(enterUrlButton);

  const urlTextArea = "textarea";
  await page.waitForSelector(urlTextArea);
  await page.evaluate(({ urlTextArea, magnetLink }) => {
    (document.querySelector(urlTextArea)).value = magnetLink;
  }, { urlTextArea, magnetLink });

  await page.evaluate(() => {
    const allButtons = document.querySelectorAll("tr > td > span > em > button");

    allButtons.forEach((button) => {
      if (button.textContent === 'OK') {
        button.click();
        return;
      }
    })
  });

  console.log('Torrent Added');
}

const downloadTorrents = async (page, torrents) => {
  // const magnetLinks = [
  //   `magnet:?xt=urn:btih:5DC6B2369BF3E15A7F4143AC59D31BF01D895D9E&dn=Star.Trek.Picard.S03E09.1080p.WEB.H264-CAKES%5BTGx%5D&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.tiny-vps.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2Fexplodie.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.cyberia.is%3A6969%2Fannounce&tr=udp%3A%2F%2Fipv4.tracker.harry.lu%3A80%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.birkenwald.de%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.moeking.me%3A6969%2Fannounce&tr=udp%3A%2F%2Fopentor.org%3A2710%2Fannounce&tr=udp%3A%2F%2Ftracker.dler.org%3A6969%2Fannounce&tr=udp%3A%2F%2F9.rarbg.me%3A2970%2Fannounce&tr=https%3A%2F%2Ftracker.foreverpirates.co%3A443%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=http%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fcoppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.zer0day.to%3A1337%2Fannounce`,
  //   `magnet:?xt=urn:btih:BABF2BC69C154A837C64038686350F2408BE1317&dn=Rippers.Revenge.2023.720p.AMZN.WEBRip.800MB.x264-GalaxyRG&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.tiny-vps.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2Fexplodie.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.cyberia.is%3A6969%2Fannounce&tr=udp%3A%2F%2Fipv4.tracker.harry.lu%3A80%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.birkenwald.de%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.moeking.me%3A6969%2Fannounce&tr=udp%3A%2F%2Fopentor.org%3A2710%2Fannounce&tr=udp%3A%2F%2Ftracker.dler.org%3A6969%2Fannounce&tr=udp%3A%2F%2F9.rarbg.me%3A2970%2Fannounce&tr=https%3A%2F%2Ftracker.foreverpirates.co%3A443%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=http%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fcoppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.zer0day.to%3A1337%2Fannounce`
  // ];

  // magnetLinks.forEach(async (link) => {
  //   await addTorrent(page, link);
  // });

  await addTorrent(page, torrents);
}

const handleCleanup = async (browser) => {
  console.log('Finishing Up...');

  await wait(10000);
  await browser.close();

  console.log('Finsihed');
}

module.exports.configureSession = configureSession;
module.exports.wait = wait;
module.exports.removeSecurityLayers = removeSecurityLayers;
module.exports.handleLogin = handleLogin;
module.exports.openDownloadStation = openDownloadStation;
module.exports.addTorrent = addTorrent;
module.exports.downloadTorrents = downloadTorrents;
module.exports.handleCleanup = handleCleanup;