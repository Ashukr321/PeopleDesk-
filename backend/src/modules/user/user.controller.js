
import createError from 'http-errors'
import { registerUserSchema } from './user.validation.js';
import User from './user.model.js';
import bcrypt from 'bcrypt';
import { sendEmail } from '../../utils/emailServices.js';
import fs from 'fs';
import path from 'path';
const __dirname = path.resolve();

// 1 . registerUser ❌No required auth 
const registerUser = async (req, res, next) => {
  try {
    // Validate request body
    const { error, value } = registerUserSchema.validate(req.body);
    if (error) {
      return next(createError(400, error.message));
    }
    const { name, email, password } = value;

    // Check if user already exists
    const existUser = await User.findOne({ email: email });
    if (existUser) {
      const err = createError(400, "User Already Exists!");
      return next(err);
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create new user with isVerified set to false
    const newUser = await User.create({
      name: name,
      email: email,
      password: hashPassword,
      isVerified: false
    });

    await newUser.save();

    // Send registration email
    // Read HTML template for email
    const emailTemplatePath = path.join(__dirname, 'src', 'mailTemplates', 'registerUser.html');
    let emailHtml = '';

    try {
      emailHtml = fs.readFileSync(emailTemplatePath, 'utf-8');
      emailHtml = `
      <h1>Hello ${name},</h1>
      <p>Your account has been created successfully!</p>
      <hr>
      <h2>Welcome to PeopleDesk!</h2>
      <p>
        PeopleDesk is a full-featured, modern Contact Management Web App built with the MERN Stack (MongoDB, Express.js, React via Next.js, Node.js).<br>
        <b>English:</b> Organize and manage your personal and professional contacts efficiently. Enjoy advanced user profiles, authentication, and productivity tools.<br>
      </p>
      <p>
        Thank you for joining PeopleDesk! <br>
        Welcome to PeopleDesk family! 🚀
      </p>
      <hr>
      <p>
        <b>Connect with us:</b><br>
        <a href="https://www.linkedin.com/in/ashukr321/" target="_blank" style="text-decoration:none;">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" alt="LinkedIn" width="32" height="32" style="vertical-align:middle;"/> LinkedIn
        </a>
        &nbsp; | &nbsp;
        <a href="https://github.com/Ashukr321/PeopleDesk-" target="_blank" style="text-decoration:none;">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" width="32" height="32" style="vertical-align:middle;"/> GitHub
        </a>
      </p>
      <p>
        <b> Follow us on LinkedIn and GitHub for updates.<br>
      </p>
    `;
    } catch (err) {
      return next(err.message)
    }

    // Prepare email object
    const registerSendEmail = {
      to: email,
      subject: "Welcome to PeopleDesk! Your Account Has Been Created Successfully",
      html: emailHtml
    };
    // Send email
    await sendEmail(registerSendEmail);
    // Respond to client
    res.status(200).json({
      success: true,
      message: "✅ User Registered Successfully!"
    });
  } catch (error) {
    next(error);
  }
}




// 2 . loginUser ❌No required auth 
const loginUser = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      message: "✅ Login Successfully!"
    })
  } catch (error) {
    return next(error);
  }
}
// 3. changePassword 
const changePassword = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      message: "✅Password Change Successfully!"
    })
  } catch (error) {
    return next(error);
  }
}
// 4. deleteAccount
const deleteAccount = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      message: "✅ Account Delete SuccessfULLY!"
    })
  } catch (error) {
    return next(error);
  }
}
// 5. forgetPassword   ❌No required auth 
const forgetPassword = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Reset password link sent to your registered email."
    });
  } catch (error) {
    return next(error);
  }
}

// 6 verifyOtp
const verifyOtp = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      message: "✅ OTP Verified Successfully!"
    })
  } catch (error) {
    return next(error);
  }
}

export { registerUser, loginUser, verifyOtp, changePassword, deleteAccount, forgetPassword }