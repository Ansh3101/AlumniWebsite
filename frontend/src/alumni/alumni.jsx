import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../navbar/navbar";
import "./new.css";
import Logo from "../images/logo-bg.png";
import { AsyncStorage } from "reactjs-async-localstorage";

function AlumniPage() {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    batch: 0,
    country: "",
    university: "",
    email: "",
    password: "",
    verified: false,
  });

  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function setDetails() {
      try {
        if (!(await AsyncStorage.getItem("alumniLogin"))) {
          await AsyncStorage.setItem("alumniLogin", "false");
        }
        setLoggedIn(JSON.parse(await AsyncStorage.getItem("alumniLogin")));

        if (loggedIn) {
          if (!(await AsyncStorage.getItem("alumniDetails"))) {
            // Call GET API
          } else {
            setData(JSON.parse(await AsyncStorage.getItem("alumniDetails")));
          }
        }
        console.log(loggedIn);
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    }

    setDetails();
  }, [loggedIn]);
  return (
    <div>
      <NavBar page={loggedIn ? "home" : "new"} />
      <div className="student">
        <h1 className="studentHeader">Alumni</h1>
        {loggedIn ? (
          <>
            {" "}
            {data.verified ? (
              <div className="studentProfile">
                <div className="coverPhoto">
                  <div className="profilePhoto"></div>
                </div>
                <div className="profileDetails">
                  <h1>
                    {data.firstName} {data.lastName}
                  </h1>
                  <p>
                    {data.university}, {data.country}
                  </p>
                  <p>Batch of {data.batch}</p>
                  <p>{data.email}</p>

                  <button className="editButton">Edit</button>
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
              <a href="/alumni/new" className="signupButton">
                Sign Up
              </a>
              <a href="/alumni/access" className="loginButton">
                Login
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AlumniPage;
