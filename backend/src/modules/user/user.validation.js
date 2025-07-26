import Joi from 'joi';

// registerUserSchema 
const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
})

// loginUserSchema
const loginUserSchema = Joi.object({
  email:Joi.string().email().required(),
  password:Joi.string().min(6).required()
})

export { registerUserSchema ,loginUserSchema};
