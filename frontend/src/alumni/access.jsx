import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./new.css";
import Logo from "../images/logo-bg.png";
import NavBar from "../navbar/navbar";
import axios from "axios";
import { AsyncStorage } from "reactjs-async-localstorage";

function AccessAlumni() {
  const [message, setMessage] = useState("");

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const submit = async () => {
    console.log(data);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND}/alumni/access`,
        data
      );
      console.log(response);
      if (response.status == 200) {
        console.log(response.data.message);
        setMessage("Login Successful!", String(response.data.message), "p");
        await AsyncStorage.setItem("alumniLogin", "true");
        await AsyncStorage.setItem(
          "alumniDetails",
          JSON.stringify(response.data.message)
        );
        navigate("/alumni");
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
        <p className="signupSub">Login to Account</p>
        <form className="signupForm">
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
          <p className="error">{String(message)}</p>
          <button className="submit" type="button" onClick={submit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AccessAlumni;
