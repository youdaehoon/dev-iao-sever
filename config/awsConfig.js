require("dotenv").config({ path: ".env" });

module.exports.awsConfig = {
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    clientId: process.env.AWS_CLIENT_ID,
  },
};
module.exports.userPoolId = process.env.USER_POOL_ID_DEV;
