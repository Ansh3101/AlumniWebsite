import { React, useEffect } from "react";
import "./landing.css";
import NavBar from "../navbar/navbar";
import { AsyncStorage } from "reactjs-async-localstorage";

function LandingPage() {
  var loggedIn;

  const checkLogin = async () => {
    try {
      if (!(await AsyncStorage.getItem("studentLogin"))) {
        await AsyncStorage.setItem("studentLogin", "false");
      }
      loggedIn =
        (await AsyncStorage.getItem("studentLogin").toLowerCase?.()) === "true";
      console.log("Logged In:", loggedIn);
      if (loggedIn) {
        if (!(await AsyncStorage.getItem("studentDetails"))) {
          await AsyncStorage.setItem("studentLogin", "false");
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    checkLogin();
  });
  return (
    <div className="landing">
      <NavBar page={"home"} />
      <div className="background">
        <div className="note">
          <div className="noteText">
            <p className="header">CIS ALUMNI</p>
            <p className="citizen">
              Making Global Citizens
              <br /> For 70 Years
            </p>
            <p className="momentum">
              <i>
                Building Bridges... <br></br>
                <a href="" className="joinAlumni">
                  Join the CIS Alumni Network
                </a>
              </i>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
