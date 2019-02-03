
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const BASE_URL = process.env.CLIENT_URL;

const defaultMailOptions = {
  from: process.env.MAIL_OPTIONS_FROM,
  to: 'swap@yopmail.com',
  subject: 'Subject',
  html: '<strong> Test mail</strong>',
};

export function verifyEmailTemplate(token) {
  const link = `${BASE_URL}/verify/${token}`
  return `<html>
    <body>
      <h4>Thanks for joining our free community.</h4><br/><br/>
      Please confirm your email by confirming your emailId.<br/>
      <a href=${link} _target=blank>
      <button>Confirm email</button>
      </a>
    </body>
  </html>`
}

export function resendEmailVerificationTemplate(token) {

  const link = `${BASE_URL}/verify/${token}`
  return `<html>
    <body>
      Please confirm your email by confirming your emailId.<br/>
      <a href=${link} _target=blank>
      <button>Confirm email</button>
      </a>
    </body>
  </html>`
}

export const triggerEmail = async (mailOptions) => {
  const options = { ...defaultMailOptions, ...mailOptions };
  try {
    const result = await sgMail.send(options);
    if (result.length > 0) {
      return result[0].toJSON();
    }
  } catch (error) {
    console.log(error)
    throw Error(error);
  }
};
