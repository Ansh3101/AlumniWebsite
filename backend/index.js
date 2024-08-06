require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connection = require("./db");
const studentNew = require("./routes/studentNew");
const studentAccess = require("./routes/studentAccess");
const alumniNew = require("./routes/alumniNew");
const alumniAccess = require("./routes/alumniAccess");
const studentDetails = require("./data/student");
const alumniDetails = require("./data/alumni");
const allStudentDetails = require("./data/all/student");
const allAlumniDetails = require("./data/all/alumni");
const studentVerification = require("./routes/studentVerify");
const alumniVerification = require("./routes/alumniVerify");
const studentUpdate = require("./routes/studentUpdate");
const alumniUpdate = require("./routes/alumniUpdate");

app = express();

connection();

app.use(express.json());
app.use(cors());

app.use("/api/students/new", studentNew);
app.use("/api/students/access", studentAccess);
app.use("/api/students/get", studentDetails);
app.use("/api/students/get/all", allStudentDetails);
app.use("/api/students/verification", studentVerification);
app.use("/api/students/update", studentUpdate);

app.use("/api/alumni/new", alumniNew);
app.use("/api/alumni/access", alumniAccess);
app.use("/api/alumni/get", alumniDetails);
app.use("/api/alumni/get/all", allAlumniDetails);
app.use("/api/alumni/verification", alumniVerification);
app.use("/api/alumni/update", alumniUpdate);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("Listening On Port: " + port);
});
