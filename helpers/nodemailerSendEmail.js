const nodemailer = require("nodemailer");

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "natatashkin@meta.ua",
    pass: META_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const nodemailerSendEmail = (data) => {
  const email = { ...data, from: "natatashkin@meta.ua" };

  transporter
    .sendMail(email)
    .then(() => console.log("Success"))
    .catch((error) => console.log(error));
};

module.exports = nodemailerSendEmail;
