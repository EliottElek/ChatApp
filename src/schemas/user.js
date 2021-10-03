const Joi = require("@hapi/joi");
export default Joi.object().keys({
  email: Joi.string().email().required().label("Email"),
  username: Joi.string().alphanum().min(4).max(30).required().label("Username"),
  name: Joi.string().min(4).max(30).required().label("Name"),
  password: Joi.string()
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$/)
    .label("Password"),
});
