import nodemailer from 'nodemailer';
import {getHtmlRegisterMail} from '../templates/emails';

const transport = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 465,
  auth: {
    user: 'apikey',
    pass: '',
  },
});

const from = '"Bethel" <desarrollo@bethelspa.com>';

export const htmlCode = ({name, code}) =>
  getHtmlRegisterMail({
    name,
    code,
  });

export default ({to, subject, text, html}) =>
  new Promise((resolve, reject) => {
    if (!to) reject('Receiber undefined');
    if (!subject) reject('Subject undefined');
    if (!html) reject('Html undefined');
    transport.sendMail({from, to, subject, text, html}, (error, info) => {
      if (error) {
        reject(error);
      }
      resolve('Message sended');
    });
  });
