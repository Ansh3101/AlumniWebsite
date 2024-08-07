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

function NewStudent() {
  const [batch, setBatch] = useState("0");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [countries, setCountries] = useState([]);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    firstName: "",
    batch: Number(batch),
    countries: JSON.stringify(countries),
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
        `${process.env.REACT_APP_BACKEND}/students/new`,
        data
      );
      console.log(response);
      if (response.status == 201) {
        console.log("CREATION SUCCESSFUL");
        setMessage("Registration Successful! Click Here To Continue");
      }
    } catch (err) {
      console.log(err);
      setMessage(err.response.data.message);
    }
  };

  return (
    <div className="newStudent">
      <NavBar page={"student"} />
      <div className="signup">
        <p className="signupHeader">CIS Student</p>
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
                  onClick={() => setData({ ...data, batch: 2024 })}
                >
                  2024
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => setData({ ...data, batch: 2025 })}
                >
                  2025
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => setData({ ...data, batch: 2026 })}
                >
                  2026
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => setData({ ...data, batch: 2027 })}
                >
                  2027
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => setData({ ...data, batch: 2028 })}
                >
                  2028
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div className="packet">
            <p>Countries:</p>
            <Form>
              {["USA", "UK", "Canada", "India"].map((type) => (
                <div key={`default-${type}`} className="mb-3">
                  <Form.Check
                    type={"checkbox"}
                    id={`default-checkbox`}
                    label={type}
                    onClick={() => {
                      setCountries((oldCountries) => [...oldCountries, type]);
                      setData({
                        ...data,
                        countries: JSON.stringify(countries),
                      });
                      console.log(data.countries);
                    }}
                  />
                </div>
              ))}
            </Form>
          </div>

          <a href="/student/access" style={{ textDecoration: "none" }}>
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

export default NewStudent;
