// ------------------------------------------------------------------------
// Server Configuration
require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

var { expressjwt: jwt } = require("express-jwt");
const secret = process.env.AUTH_SECRET ?? "SecretWhenUndefinedThatsSecure29393993938228374983838";
const protected = jwt({ secret, algorithms: ["HS256"] });

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
// Torrent Downloader Routes
app.post('/add-torrent', protected, async (req, res) => {
  const { torrents } = req.body;

  const { page, browser } = await configureSession({ headless: true });
  await handleLogin(page);
  await openDownloadStation(page);
  await downloadTorrents(page, torrents);
  await handleCleanup(browser);

  res.sendStatus(200);
});

// ------------------------------------------------------------------------
// Authentication Routes
const User = require('./models/User');
const { verifyHash } = require('./lib/hashing');
const { sign } = require("jsonwebtoken");

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && verifyHash(password, user.password)) {
    const token = sign({ id: user.id }, secret, { expiresIn: '1h' });
    return res.status(200).json({ token });
  } else {
    return res.sendStatus(401);
  }
});

// ------------------------------------------------------------------------
// Server Configuration
const { mongoose } = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect(
  `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_HOST}/?retryWrites=true&w=majority`, 
  () => { console.log(`Connected to mongoDB`); }
);

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server running on port: ${process.env.PORT || 8080}`);
});