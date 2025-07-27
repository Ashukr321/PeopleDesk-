import createError from 'http-errors'
import { registerUserSchema, loginUserSchema, otpVerificationSchema, changePasswordSchema, forgetPasswordSchema,resetPasswordSchema } from './user.validation.js';
import User from './user.model.js';
import bcrypt from 'bcrypt';
import { sendEmail } from '../../utils/emailServices.js';
import generateOTP from '../../utils/generateOTP.js';
import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import envConfig from '../../config/envConfig.js';
import { create } from 'domain';
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
          LinkedIn
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
    const { error, value } = loginUserSchema.validate(req.body);
    if (error) {
      return next(createError(400, error.message));
    }
    const { email, password } = value;

    console.log(email, password);
    // checkUserExist
    const existUser = await User.findOne({ email: email });
    if (!existUser) {
      const err = createError(400, "User Not Found!");
      return next(err);
    }
    // isMatchPassword 
    const isMatchPassword = await bcrypt.compare(password, existUser.password);
    if (!isMatchPassword) {
      const err = createError(400, "Incorrect password. Please try again.");
      return next(err);
    }
    // get otp 
    const otp = generateOTP(6);
    // hashOtp for security
    const hashOtp = await bcrypt.hash(otp, 10);
    //set otp
    existUser.otp = hashOtp;
    // Set OTP to expire in 5 minutes 
    existUser.otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await existUser.save();
    // send opt to register user email 
    // Read HTML template for email
    const emailTemplatePath = path.join(__dirname, 'src', 'mailTemplates', 'loginUser.html');
    let emailHtml = '';

    // Send OTP to user's email and add message for validity (5 min)
    emailHtml = fs.readFileSync(emailTemplatePath, 'utf-8');
    emailHtml = `
        <h1>Your OTP for login is:  <b> <mark>${otp}</mark> </b></h1>
        <p style="color: #d9534f;"><b>Note:</b> This OTP is valid for 5 minutes only.</p>
        <hr>
        <h2>Welcome to PeopleDesk!</h2>
        <p>
          <b>Connect with us:</b><br>
          &nbsp; | &nbsp;

          <a href="https://www.linkedin.com/in/ashukr321/" target="_blank" style="text-decoration:none;">
           LinkedIn
          </a>

          <a href="https://github.com/Ashukr321/PeopleDesk-" target="_blank" style="text-decoration:none;">
            GitHub
          </a>
        </p>
      `;
    // verificationsSendEmail 
    const verificationsSendEmail = {
      to: email,
      subject: "OTP Verification",
      html: emailHtml,
    };
    await sendEmail(verificationsSendEmail);
    return res.status(200).json({
      success: true,
      message: "✅ OTP has been sent to your registered email address.)"
    });
  } catch (error) {
    return next(error);
  }
}

// 3 verifyOtp
const verifyOtp = async (req, res, next) => {
  try {
    const { error, value } = otpVerificationSchema.validate(req.body);
    if (error) {
      return next(createError(400, error.message));
    }

    const { email, otp } = value;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return next(createError(400, "User not found with the provided email."));
    }

    // Check if OTP is expired
    const isOtpExpired = Date.now() > existingUser.otpExpiresAt;
    if (isOtpExpired) {
      return next(createError(400, "OTP has expired. Please request a new one."));
    }

    // Compare OTP
    const isOtpMatch = await bcrypt.compare(otp, existingUser.otp);
    if (!isOtpMatch) {
      return next(createError(400, "Incorrect OTP. Please try again."));
    }
    // set isVerified - true
    existingUser.isVerified = true;
    // Clear OTP and expiry from DB
    existingUser.otp = undefined;
    existingUser.otpExpiresAt = undefined;
    await existingUser.save();

    // Create JWT token
    const token = jwt.sign(
      { userId: existingUser._id },
      envConfig.jwt_secret,
      { expiresIn: envConfig.jwt_token_expires_in }
    );

    return res.status(200).json({
      success: true,
      message: "✅ OTP verified successfully. Login completed!",
      token,
    });
  } catch (error) {
    return next(error);
  }
};


// 4. changePassword 
const changePassword = async (req, res, next) => {
  try {
    const { error, value } = changePasswordSchema.validate(req.body);
    if (error) {
      return next(createError(400, error.message));
    }
    // getUserID 
    const userId = await req.userId;
    const userExits = await User.findById(userId);
    const { currentPassword, newPassword, confirmNewPassword } = value;
    if (!userExits) {
      const err = createError(400, "Invalid User");
      return next(err);
    }

    const isMatchCurrentPassword = await bcrypt.compare(currentPassword, userExits.password);

    if (!isMatchCurrentPassword) {
      const err = createError(400, "Current Password don't match!");
      return next(err);
    }
    // hashNewPassword 
    const hashNewPassword = await bcrypt.hash(newPassword, 10);
    userExits.password = hashNewPassword;
    await userExits.save();
    return res.status(200).json({
      success: true,
      message: "✅Password Change Successfully!"
    })
  } catch (error) {
    return next(error);
  }
}

// 5. forgetPassword   ❌No required auth 
const forgetPassword = async (req, res, next) => {
  try {
    const { error, value } = forgetPasswordSchema.validate(req.body);
    if (error) {
      const err = createError(400, error.message);
      return next(err);
    }

    const { email } = value;

    const userExits = await User.findOne({ email });

    if (!userExits) {
      const err = createError(400, "User Not Found !");
      return next(err);
    }

    // create resetTokenLink (expires in 5 minutes)
    const resetToken = jwt.sign(
      { userId: userExits._id },
      envConfig.jwt_secret,
      { expiresIn: '5m' }
    );

    // Set resetPasswordExpires to 1 hour from now
    userExits.resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000);
    await userExits.save();

    const resetLink = `${envConfig.client_url}/reset-password?token=${resetToken}`;

    // get mail template path
    const resetPasswordMail = path.join(__dirname, 'src', 'mailTemplates', 'forgetPassword.html');

    let resetHtml = fs.readFileSync(resetPasswordMail, 'utf-8');

    resetHtml = `<div style="text-align:center;">
      <h2>Password Reset Request</h2>
      <p>Click the link below to reset your password:</p>
      <a href="${resetLink}" style="display:inline-block;padding:10px 20px;background:#007bff;color:#fff;text-decoration:none;border-radius:5px;">Reset Password</a>
      <p>If you did not request this, please ignore this email.</p>
    </div>`;

    try {
      await sendEmail({
        to: email,
        subject: "Password Reset Request - Action Required",
        html: resetHtml,
      });
    } catch (mailError) {
      return next(createError(500, "Failed to send reset password email. Please try again later."));
    }

    return res.status(200).json({
      success: true,
      message: "Reset password link sent to your registered email.",
    });

  } catch (error) {
    return next(error);
  }
};


// 6. resetPassword
const resetPassword = async (req, res, next) => {
  try {

    const {error,value} = resetPasswordSchema.validate(req.body);
    if(error){
      return next(createError(400,error.message));
    }
    // get userId
    const userId = req.userId;
    const {newPassword} = value;

    // userExits 
    const userExits = await User.findById(userId);
    // hash newPassword 
    const hashNewPassword = await bcrypt.hash(newPassword,10);
    userExits.password = hashNewPassword;
    await userExits.save();
    
    return res.status(200).json({
      success: true,
      message: "your password has be changed !"
    })

  } catch (error) {
    return next(error);
  }
}

// 7 logoutUser
const logoutUser = async(req,res,next)=>{
  try {
    const userId = req.userId;
    const exitUser = await User.findById(userId);
    if(!exitUser){
      return next(createError(400,"User Not Found!"));
    }
    exitUser.isVerified=false;
    await exitUser.save();
    
    return res.status(200).json({
      success:true,
      message:"logout SuccessFully!"
    })

  } catch (error) {
    return next(error);
  }
}
// 7. deleteAccount
const deleteAccount = async (req, res, next) => {
  try {
    const userId = req.userId;
    const existUser = await User.findById(userId);
    if (!existUser) {
      const err = createError(400, "User Not Found!");
      return next(err);
    }

    await User.deleteOne({ _id: userId });

    return res.status(200).json({
      success: true,
      message: "✅ Account deleted successfully!"
    });
  } catch (error) {
    return next(error);
  }
}



export { registerUser, loginUser, verifyOtp, changePassword, deleteAccount, forgetPassword, resetPassword ,logoutUser}