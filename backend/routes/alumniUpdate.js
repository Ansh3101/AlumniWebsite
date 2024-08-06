const router = require("express").Router();
const { Alumni } = require("../models/alumni");
const bcrypt = require("bcrypt");
const joi = require("joi");

router.post("/", async (req, res) => {
  try {
    if (req.body.accessKey == process.env.ACCESS_KEY) {
      let user = await Alumni.findOneAndUpdate(
        { email: req.body.email },
        req.body,
        { new: true }
      );
      if (!user) {
        return res.status(401).send({ message: "User Does Not Exist!" });
      }

      delete user["password"];

      res.status(200).send({ data: user });
    } else return res.status(400).send({ message: "Authentication Error!" });
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
