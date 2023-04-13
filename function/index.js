// ------------------------------------------------------------------------
// Server Configuration
require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

// ------------------------------------------------------------------------
// Helper Functions
const {
  configureSession,
  handleLogin,
  openDownloadStation,
  downloadTorrents,
  handleCleanup
} = require('./lib/helpers');

// ------------------------------------------------------------------------
// Routes
app.post('/add-torrent', async (req, res) => {
  const { torrents } = req.body;

  const { page, browser } = await configureSession({ headless: true });
  await handleLogin(page);
  await openDownloadStation(page);
  await downloadTorrents(page, torrents);
  await handleCleanup(browser);

  res.sendStatus(200);
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port: ${process.env.PORT}`);
});