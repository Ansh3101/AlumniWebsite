import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./new.css";
import Logo from "../images/logo-bg.png";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";
import axios from "axios";
import NavBar from "../navbar/navbar";

function NewAlumni() {
  const [batch, setBatch] = useState("0");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    batch: Number(batch),
    country: "",
    university: "",
    email: "",
    password: "",
    verified: false,
  });

  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const submit = async () => {
    console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/alumni/new",
        data
      );
      console.log(response);
      if (response.status == 201) {
        console.log("CREATION SUCCESSFUL");
        setMessage("Registration Successful. Click Here To Continue");
      }
    } catch (err) {
      console.log(err);
      setMessage(err.response.data.message);
    }
  };

  return (
    <div className="newStudent">
      <NavBar page={"new"} />
      <div className="signup">
        <p className="signupHeader">CIS Alumni</p>
        <p className="signupSub">Create An Account</p>
        <form className="signupForm">
          <div className="name">
            <div className="packet">
              <p>First Name:</p>
              <input
                className="firstName"
                type="text"
                placeholder="First Name"
                name="firstName"
                value={data.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="packet">
              <p>Last Name:</p>
              <input
                className="lastName"
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={data.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="packet">
            <p>Email:</p>
            <input
              className="email"
              type="email"
              placeholder="Email ID"
              name="email"
              value={data.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="packet">
            <p>Password:</p>
            <input
              className="email"
              type="password"
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="packet">
            <p>Batch:</p>
            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle> {data.batch} </Dropdown.Toggle>
              <Dropdown.Menu className="super-colors">
                <Dropdown.Item
                  onClick={() => setData({ ...data, batch: 2014 })}
                >
                  2014
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => setData({ ...data, batch: 2015 })}
                >
                  2015
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => setData({ ...data, batch: 2016 })}
                >
                  2016
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => setData({ ...data, batch: 2017 })}
                >
                  2017
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => setData({ ...data, batch: 2018 })}
                >
                  2018
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div className="packet">
            <p>Country of Study:</p>
            <input
              className="email"
              type="text"
              placeholder="Country"
              name="country"
              value={data.country}
              onChange={handleChange}
              required
            />
          </div>

          <div className="packet">
            <p>University Attended:</p>
            <input
              className="email"
              type="text"
              placeholder="University"
              name="university"
              value={data.university}
              onChange={handleChange}
              required
            />
          </div>
          <a href="/alumni/access" style={{ textDecoration: "none" }}>
            <p className="error">{String(message)}</p>
          </a>
          <button className="submit" type="button" onClick={submit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewAlumni;
