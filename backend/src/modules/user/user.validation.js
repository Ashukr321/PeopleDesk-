import Joi from 'joi';

// registerUserSchema 
const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
})

// loginUserSchema
const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
})

// otpVerificationSchema 
const otpVerificationSchema = Joi.object({
  email: Joi.string().email().required(),
  otp: Joi.string().min(6).required(),
})

// currentPassword, newPassword, confirmNewPassword
const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().min(6).required()
    .messages({
      'string.empty': 'Current password is required.',
      'string.min': 'Current password must be at least 6 characters.'
    }),
  newPassword: Joi.string().min(6).required()
    .messages({
      'string.empty': 'New password is required.',
      'string.min': 'New password must be at least 6 characters.'
    }),
  confirmNewPassword: Joi.string().valid(Joi.ref('newPassword')).required()
    .messages({
      'any.only': 'Confirm new password must match new password.',
      'string.empty': 'Confirm new password is required.'
    })
})

// forgetPasswordSchema 
const forgetPasswordSchema = Joi.object({
  email:Joi.string().email().required()
})

// resetPasswordSchema 
const resetPasswordSchema = Joi.object({
  newPassword:Joi.string().min(6).required(),
  confirmNewPassword:Joi.string().valid(Joi.ref('newPassword')).required()
  .messages({
    'any.only': 'Confirm new password must match new password.',
    'string.empty': 'Confirm new password is required.'
  })
})
// updateUserNameSchema 

const updateUserNameSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
})



export { registerUserSchema, loginUserSchema, otpVerificationSchema,changePasswordSchema,forgetPasswordSchema,resetPasswordSchema,updateUserNameSchema};
