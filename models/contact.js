const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = Schema(
  {
    name: {
      type: String,
      match: /^[a-zA-Z. ']+$/,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      match: /^[0-9]{10}$/,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const messagesOptions = (fieldName) => {
  switch (fieldName) {
    case "name":
      return {
        "string.pattern.base": `${fieldName} field should include only characters, spaces and apostrofe`,
        "any.required": `missing required ${fieldName} field`,
        "string.empty": `${fieldName} cannot be an empty field`,
      };
    case "email":
      return {
        "string.email": `${fieldName} should be valid, example: example@io.com`,
      };
    case "phone":
      return {
        "string.pattern.base": `${fieldName} field should include only numbers`,
      };
    case "favorite":
      return {
        "any.required": `missing field of ${fieldName}`,
      };
    default:
      break;
  }
};

const joiSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Z. ']+$/)
    .required()
    .messages({ ...messagesOptions("name") }),
  email: Joi.string()
    .email()
    .messages({ ...messagesOptions("email") }),
  phone: Joi.string()
    .pattern(/^[0-9]+$/)
    .length(10)
    .messages({ ...messagesOptions("phone") }),
  favorite: Joi.bool(),
})
  .or("email", "phone")
  .messages({
    "object.missing": "query must contain at least one of [email, phone]",
  });

const joiStatusSchema = Joi.object({
  favorite: Joi.bool()
    .required()
    .messages({ ...messagesOptions("favorite") }),
});

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  joiSchema,
  joiStatusSchema,
};
