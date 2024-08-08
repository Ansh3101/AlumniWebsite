import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./new.css";
import Logo from "../images/logo-bg.png";
import Students from "../images/students.png";

import NavBar from "../navbar/navbar";
import { AsyncStorage } from "reactjs-async-localstorage";

function StudentPage() {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    firstName: "",
    batch: 0,
    countries: [],
    email: "",
    password: "",
    verified: false,
  });

  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const login = async () => {
      try {
        if (!(await AsyncStorage.getItem("studentLogin"))) {
          await AsyncStorage.setItem("studentLogin", "false");
        }
        setLoggedIn(JSON.parse(await AsyncStorage.getItem("studentLogin")));
        if (loggedIn) {
          if (await AsyncStorage.getItem("studentDetails")) {
            setData(JSON.parse(await AsyncStorage.getItem("studentDetails")));
          }
        }
        console.log(loggedIn);
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    };
    login();
  }, [loggedIn]);
  return (
    <div>
      <NavBar page={loggedIn ? "home" : "student"} />
      <div className="student">
        <h1 className="studentHeader">Student</h1>
        {loggedIn == true ? (
          <>
            {data.verified == true ? (
              <div className="studentProfile">
                <div className="coverPhoto">
                  <div className="profilePhoto"></div>
                </div>
                <div className="profileDetails">
                  <h1>
                    {data.firstName} {data.lastName}
                  </h1>
                  <p>Batch of {data.batch}</p>
                  <p>{data.email}</p>
                  <p>{JSON.parse(data.countries).join(", ")}</p>

                  {/* <button className="editButton">Edit</button> */}
                </div>
              </div>
            ) : (
              <div className="notVerified">
                <h2>Verification Pending</h2>
                <p>
                  Your account has been successfully registered but is pending
                  verification by the admin. Click on the button to request
                  verification
                </p>
                <button className="signupButton verify">Verify Now</button>
              </div>
            )}
            <button
              className="loginButton logoutButton"
              onClick={async () => {
                await AsyncStorage.clear();
                navigate("/");
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <div className="studentImage" />
            <div className="buttons">
              <a href="/student/new" className="signupButton">
                Sign Up
              </a>
              <a href="/student/access" className="loginButton">
                Login
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default StudentPage;
