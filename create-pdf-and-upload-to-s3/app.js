const puppeteer = require("puppeteer");
const fs = require("fs-extra");
const path = require("path");
const ejs = require("ejs");
const dotenv = require("dotenv");
dotenv.config();
const AWS = require("aws-sdk");
const { nanoid } = require("nanoid");

const user = require("./user.json");

const awsConfig = {
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  region: process.env.region,
};

const s3 = new AWS.S3(awsConfig);

const bucketName = process.env.bucketName;

const uploadPdf = async () => {
  return new Promise((resolve, reject) => {
    const fileData = fs.createReadStream("./list.pdf");

    const params = {
      Bucket: bucketName,
      Key: `${nanoid()}.pdf`,
      Body: fileData,
      ContentType: "application/pdf",
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      console.log(data);
      return resolve(data);
    });
  });
};

const compile = async (template, data) => {
  const filePath = path.join(process.cwd(), "views", `${template}.ejs`);
  const html = await fs.readFile(filePath, "utf-8");

  return ejs.compile(html)(data);
};

//create pdf

const createPDF = async () => {
  try {
    let browser = await puppeteer.launch();
    const page = await browser.newPage();

    const content = await compile("list", { user });
    await page.setContent(content);
    await page.emulateMediaFeatures("screen");
    await page.pdf({
      path: "list.pdf",
      format: "A4",
      printBackground: true,
    });
    //upload to s3 buckect
    await uploadPdf();

    await browser.close();
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

createPDF();
