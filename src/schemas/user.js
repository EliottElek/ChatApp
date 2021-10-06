const Joi = require("@hapi/joi");

const email = Joi.string().email().required().label("Email");
const username = Joi.string()
  .alphanum()
  .min(4)
  .max(30)
  .required()
  .label("Username");
const name = Joi.string().min(4).max(30).required().label("Name");
const password = Joi.string()
  .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$/)
  .label("Password");

export const signUp = Joi.object().keys({
  email: email,
  username: username,
  name: name,
  password: password,
});

export const signIn = Joi.object().keys({
  email: email,
  password: password,
});
