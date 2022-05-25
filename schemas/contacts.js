const Joi = require("joi");

const defaultMessages = (field) => {
  return {
    "string.empty": `${field} cannot be an empty field`,
    "any.required": `missing required ${field} field`,
  };
};

const messagesOptions = (fieldName) => {
  switch (fieldName) {
    case "name":
      return {
        ...defaultMessages(fieldName),
        "string.pattern.base": `${fieldName} field should include only characters, spaces and apostrofe`,
      };
    case "email":
      return {
        ...defaultMessages(fieldName),
        "string.email": `${fieldName} should be valid, example: example@io.com`,
      };
    case "phone":
      return {
        ...defaultMessages(fieldName),
        "string.pattern.base": `${fieldName} field should include only numbers`,
      };
    default:
      break;
  }
};

const contactSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Z. ']+$/)
    .required()
    .messages({ ...messagesOptions("name") }),
  email: Joi.string()
    .email()
    .required()
    .messages({ ...messagesOptions("email") }),
  phone: Joi.string()
    .pattern(/^[0-9]+$/)
    .length(10)
    .required()
    .messages({ ...messagesOptions("phone") }),
});

// .error((errors) => new Error("missing fields"));

module.exports = contactSchema;
