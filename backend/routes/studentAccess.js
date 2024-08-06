const router = require("express").Router();
const { Student } = require("../models/student");
const bcrypt = require("bcrypt");
const joi = require("joi");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const user = await Student.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send({ message: "User Does Not Exist!" });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.status(401).send({ message: "Invalid Password!" });
    }

    res.status(200).send({ message: user });
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

const validate = (data) => {
  const schema = joi.object({
    email: joi.string().email().required().label("Email"),
    password: joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = router;
