const S3 = require('aws-sdk/clients/s3');
const fs = require('fs');
const config = require('@config');
const uuid = require('uuid').v4;

const bucketName = config.AWSBucketName;
const region = config.AWSRegion;
const accessKeyId = config.AWSAccessKeyId;
const secretAccessKey = config.AWSSecretKey;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

//Upload a file to s3
function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path);
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: `${uuid()}?${file.originalname}`,
    ContentEncoding: 'base64',
  };
  return s3.upload(uploadParams).promise();
}

exports.uploadFile = uploadFile;

//get signed urls

const getUrlPromise = async (key) => {
  const params = {
    Bucket: bucketName,
    Key: key,
    Expires: 60 * 10080, //1 day have 1440 minutes so, 7 days * 1440 mins = 10080 mins, and we multiply by 60
  };
  return s3.getSignedUrl('getObject', params);
};

exports.getUrlPromise = getUrlPromise;
