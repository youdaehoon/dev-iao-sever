const configData = require("../config/awsConfig.js");
const AWS = require("aws-sdk");

const cog = new AWS.CognitoIdentityServiceProvider(configData.awsCongig);

const userPoolId = configData.userPoolId;

const listUsers = async () => {
  const params = {
    UserPoolId: userPoolId,
    Limit: 10,
  };

  try {
    const data = await cog.listUsers(params).promise();
    return data;
  } catch (err) {
    console.log("error" + err);
  }
};

const confirm = async (name) => {
  const confirmParams = {
    UserPoolId: userPoolId,
    Username: name,
  };
  console.log(confirmParams, cog.config);

  const data = await cog.adminConfirmSignUp(confirmParams, (err, data) => {
    if (err) console.log(err, err.stack);
    else return data;
  });
};

module.exports.User = {
  listUsers,
  confirm,
};
// const userService = {
//   async ListUesrs() {
//     const params = {
//       UserPoolId: userPoolId,
//       Limit: 10,
//     };

//     try {
//       const data = await cog.listUsers(this.params).promise();
//       return data;
//     } catch (err) {
//       console.log("error" + err);
//     }
//   },
//   async confirm(userName) {
//     const confirmParams = {
//       UserPoolId: userPoolId,
//       Username: userName,
//     };
//     try {
//       const data = await cog.adminConfirmSignUp(confirmParams);
//       return data;
//     } catch (err) {
//       console.log(err);
//     }
//   },
//   // async AdminDeleteUser(Username) {
//   //   const params = {
//   //     UserPoolId: userPoolId,
//   //     Username: Username,
//   //   };
//   //   try {
//   //     const data = await cog.adminDeleteUser(params);
//   //     return data;
//   //   } catch (err) {
//   //     console.log(err);
//   //   }
//   // },
// };

// module.exports.userService = userService;
