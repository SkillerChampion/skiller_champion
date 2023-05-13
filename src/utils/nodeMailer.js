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
      user: configurations.nodeMailerUser,
      pass: await getDynamicEnv(configurations.nodeMailerPass),
    },
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: `"SECURITY NODEMAILER " <${configurations.nodeMailerUser}>`, // sender address
    to: configurations.nodeMailerRecipient, // list of receivers
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
