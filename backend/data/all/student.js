const router = require("express").Router();
const { Student } = require("../../models/student");
const bcrypt = require("bcrypt");
const joi = require("joi");

router.post("/", async (req, res) => {
  try {
    let user;
    if (req.body.accessKey == process.env.ACCESS_KEY) {
      if (req.body.batch) {
        user = await Student.find({ batch: req.body.batch });
      } else if (typeof req.body.verified === "boolean") {
        user = await Student.find({ verified: req.body.verified });
      } else {
        user = await Student.find();
      }
      if (!user) {
        return res.status(401).send({ message: "User Does Not Exist!" });
      }

      res.status(200).send({ data: user });
    } else return res.status(400).send({ message: "Authentication Error!" });
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
