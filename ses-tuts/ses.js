const AWS = require("aws-sdk");
const { nanoid } = require("nanoid");
const env = require("dotenv");
env.config();

const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
};

const SES = new AWS.SES(awsConfig);

const sendEmail = async () => {
  const email = process.env.FROM_EMAIL;
  const shortCode = nanoid(6).toUpperCase();

  try {
    //prepare email to send

    const params = {
      Source: email,
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Subject: {
          Charset: "UTF-8",
          Data: `OTP Verification`,
        },
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: `<h1>Your verification code is ${shortCode}</h1>`,
          },
        },
      },
    };

    const emailSent = SES.sendEmail(params).promise();
    emailSent
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendEmail;
