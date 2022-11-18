const configData = require("../config/awsConfig.js");
const AWS = require("aws-sdk");
const cog = new AWS.CognitoIdentityServiceProvider(configData.awsCongig);

const userPoolId = configData.userPoolId;

const userService = {
  params: {
    UserPoolId: userPoolId,
    Limit: 10,
  },

  async ListUesrs() {
    console.log(this.params);

    try {
      const data = await cog.listUsers(this.params).promise();
      return data;
    } catch (err) {
      console.log("error" + err);
    }
  },
  async adminConfirmSignUp(userName) {
    const params = {
      UserPoolId: userPoolId,
      Username: userName,
    };
    try {
      const data = await cog.adminConfirmSignUp(params);
      return data;
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports.userService = userService;