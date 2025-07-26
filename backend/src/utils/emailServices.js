import nodemailer from 'nodemailer'
import envConfig from '../config/envConfig.js'
// create transporter 
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: envConfig.user_email,
    pass: envConfig.user_email_password
  }
});

// sendEmail utils function 
const sendEmail = async ({ to, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"peopleDesk" <${envConfig.user_email}>`,
      to,
      subject,
      html
    })
    return info
  } catch (error) {
    throw error;
  }
}

export { sendEmail };
