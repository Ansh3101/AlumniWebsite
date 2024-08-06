const mongoose = require("mongoose");
const joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const alumniSchema = new mongoose.Schema({
  firstName: { type: "string", required: true },
  lastName: { type: "string", required: true },
  batch: { type: "number", required: true },
  university: { type: "string", required: true },
  country: { type: "string", required: true },
  email: { type: "string", required: true },
  password: { type: "string", required: true },
  verified: { type: "boolean", required: true },
});

const Alumni = mongoose.model("alumni", alumniSchema);

const validate = (data) => {
  const schema = joi.object({
    firstName: joi.string().required().label("First Name"),
    lastName: joi.string().required().label("Last Name"),
    batch: joi.number().required().label("Batch"),
    university: joi.string().required().label("University"),
    country: joi.string().required().label("Country"),
    email: joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
    verified: joi.boolean().required().label("Verified"),
  });
  return schema.validate(data);
};

module.exports = { Alumni, validate };
