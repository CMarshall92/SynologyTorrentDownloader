const cors = require("cors");

var whitelist = process.env.CORS_WHITELIST?.split(",") ?? [];
var corsOptions = {
  exposedHeaders: ["set-cookie"],
  credentials: true,
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

module.exports = cors(corsOptions);