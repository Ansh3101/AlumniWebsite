const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const studentSchema = new mongoose.Schema({
  firstName: { type: "string", required: true },
  lastName: { type: "string", required: true },
  batch: { type: "number", required: true },
  email: { type: "string", required: true },
  countries: { type: "string", required: true },
  password: { type: "string", required: true },
  verified: { type: "boolean", required: true },
});

studentSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTKEY, {
    expiresIn: "7d",
  });
  return token;
};
const Student = mongoose.model("student", studentSchema);

const validate = (data) => {
  const schema = joi.object({
    firstName: joi.string().required().label("First Name"),
    lastName: joi.string().required().label("Last Name"),
    batch: joi.number().required().label("Batch"),
    countries: joi.string().required().label("Countries"),
    email: joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
    verified: joi.boolean().required().label("Verified"),
  });
  return schema.validate(data);
};

module.exports = { Student, validate };
