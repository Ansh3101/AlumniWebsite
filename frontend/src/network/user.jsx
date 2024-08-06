import { React, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../images/logo-bg.png";
import Students from "../images/students.png";

import NavBar from "../navbar/navbar";
import { AsyncStorage } from "reactjs-async-localstorage";

function UserPage() {
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

  const [user, setUser] = useState({});

  const [type, setType] = useState("student");

  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

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
            const userData = location.state;
            setUser(userData);
            setType(location.pathname.split("/")[1]);
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
        <h1 className="studentHeader"></h1>
        {loggedIn == true ? (
          <>
            {data.verified == true ? (
              <div className="studentProfile">
                <div className="coverPhoto">
                  <div className="profilePhoto"></div>
                </div>
                <div className="profileDetails">
                  <h1>
                    {user.firstName} {user.lastName}
                  </h1>
                  <p>Batch of {user.batch}</p>
                  <p>{user.email}</p>
                  <p>
                    {type == "alumni"
                      ? user.university + "," + user.country
                      : JSON.parse(user.countries).join(", ")}
                  </p>
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
          </>
        ) : (
          <>
            <div className="notVerifiedConnect">
              <h1 className="notVerifiedHeader">The CIS Connect</h1>
              <h2>Not Logged In</h2>
              <p>
                You must be a registered and verified student/alumni to be able
                to access the CIS Network.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default UserPage;
