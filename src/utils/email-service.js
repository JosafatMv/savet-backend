const  nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
require('dotenv').config();

const transporter = nodemailer.createTransport(
    smtpTransport({
      host: 'smtp.gmail.com',
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    }));

module.exports = {
    transporter,
}