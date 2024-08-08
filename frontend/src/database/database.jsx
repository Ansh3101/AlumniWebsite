import React from "react";
import "./database.css";
import Connect from "../images/connect.jpeg";

function DatabasePage() {
  return (
    <div className="database">
      <div className="databaseHeading">
        <p className="databaseHeader">Reconnect With Your CIS Family</p>
        <p className="databaseSub">Stay Connected</p>
        <p className="databaseCaption">
          You are forever a part of this community.<br></br>
          <i>Help us stay in touch.</i>
        </p>
        <a href="/alumni" className="joinNetwork">
          Join The Network
        </a>
      </div>
      <div className="databaseImage">
        <img src={Connect} alt="" className="connected" />
      </div>
    </div>
  );
}

export default DatabasePage;
