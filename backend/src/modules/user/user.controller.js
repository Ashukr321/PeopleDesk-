
import createError from 'http-errors'
// 1 . registerUser ❌No required auth 
const registerUser = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: "✅ User Register SuccessFully!"
    })

  } catch (error) {
    return next(error);
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