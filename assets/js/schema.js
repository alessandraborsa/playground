import Joi from "joi";

export const schema = Joi.object({
  first_name: Joi.string()
    .min(1)
    .max(30)
    .messages({
      "string.base": `"First Name" should be a type of 'text'`,
      "string.empty": `"First Name" cannot be an empty field`,
      "string.min": `"First Name" should have a minimum length of {#limit}`,
      "string.max": `"First Name" should have a maximum length of {#limit}`,
    }),

  last_name: Joi.string().min(1).max(30).messages({
    "string.base": `"Last Name" should be a type of 'text'`,
    "string.empty": `"Last Name" cannot be an empty field`,
    "string.min": `"Last Name" should have a minimum length of {#limit}`,
    "string.max": `"Last Name" should have a maximum length of {#limit}`,
  }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": `"Email" must be a valid email`,
      "string.empty": `"Email" cannot be an empty field`,
      "any.required": `"Email" is a required field`,
    }),

  message: Joi.string()
    .min(1)
    .max(500)
    .required()
    .messages({
      "string.base": `"Message" should be a type of 'text'`,
      "string.empty": `"Message" cannot be an empty field`,
      "string.min": `"Message" should have a minimum length of {#limit}`,
      "string.max": `"Message" should have a maximum length of {#limit}`,
      "any.required": `"Message" is a required field`,
    }),
});

export default schema;
