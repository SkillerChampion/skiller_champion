const nodemailer = require('nodemailer');
const configurations = require('../../config');
const { getDynamicEnv } = require('./helperFunctions');
const { NODE_ENVS } = require('./constants');

const sendEmailToAdmin = async (title = '', body = '') => {
  console.log('SECURITY NOTIFICATION - ', title);

  if (configurations.NODE_ENV === NODE_ENVS.development) return;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: configurations.NODE_MAILER_USER,
      pass: await getDynamicEnv(configurations.NODE_MAILER_PASS),
    },
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: `"SECURITY NODEMAILER " <${configurations.NODE_MAILER_USER}>`, // sender address
    to: configurations.NODE_MAILER_RECIPIENT, // list of receivers
    subject: 'URGENT SECURITY - SKILLER CHAMPION ✔', // Subject line
    text: body, // plain text body
    html: title, // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Nodemailer message sent: %s', info.messageId);
  });
};

module.exports = { sendEmailToAdmin };
