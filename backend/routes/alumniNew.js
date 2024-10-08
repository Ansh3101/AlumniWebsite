const router = require("express").Router();
const { Alumni, validate } = require("../models/alumni");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);

    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const user = await Alumni.findOne({ email: req.body.email });
    if (user) {
      return res.status(409).send({ message: "User already Exists!" });
    } else {
      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hashPassword = await bcrypt.hash(req.body.password, salt);

      await new Alumni({ ...req.body, password: hashPassword }).save();
      res.status(201).send({ message: "User Created Successfully!" });
    }
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error: " + err });
  }
});

module.exports = router;
