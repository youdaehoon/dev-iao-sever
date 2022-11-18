const fs = require("fs");
const AWS = require("aws-sdk");
const S3 = new AWS.S3();

const uploadImage = async (file) => {
  console.log(file);
  const fileStream = file.buffer;
  const params = {
    Bucket: "dev-iao-test-image",
    Body: fileStream,
    Key: file.originalname,
  };
  try {
    const data = await S3.upload(params).promise();
    return data;
  } catch (err) {
    console.log(err);
  }
};

const getImage = async () => {
  const params = {
    Bucket: "dev-iao-test-image",
  };
  const data = await S3.listObjects(params).promise();
  return data;
};

module.exports.S3 = {
  uploadImage,
  getImage,
};
