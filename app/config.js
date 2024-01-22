const dotenv = require("dotenv");

dotenv.config();

const secretKey = process.env.SECRET_KEY;
const serviceName = process.env.SERVICE_NAME;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dbName = process.env.DB_NAME;

module.exports = {
  secretKey,
  serviceName,
  dbHost,
  dbPort,
  dbUser,
  dbPass,
  dbName,
};
