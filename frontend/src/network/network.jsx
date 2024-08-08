import React from "react";
import "./network.css";
import Connect from "../images/connect.jpeg";

function NetworkPage() {
  return (
    <div className="network">
      <div className="networkHeading">
        <p className="networksHeader">The CIS Network</p>
        <p className="networksSub">Engage & Grow</p>
        <p className="eventsCaption">
          An active community helps support and build momentum<br></br> for
          everything we strive to accomplish in work and in life. <br></br> Join
          with others and watch the possibilities expand.
        </p>
      </div>
      <div className="networkOpportunities">
        <div className="networkBox">
          <img src={Connect} alt="" className="networkImage" />
          <p className="networkHeader">Careers</p>
          <p className="networkCaption">
            Limitless opportunities in thriving fields and <br></br>expanding
            frontiers.
          </p>
          <a href="/connect" className="learnMore">
            Learn More
          </a>
        </div>
        <div className="networkBox">
          <img src={Connect} alt="" className="networkImage" />
          <p className="networkHeader">Networking</p>
          <p className="networkCaption">
            See your life and career as a team effort.
            <br></br>Learning does not end at graduation.
          </p>
          <a href="/connect" className="learnMore">
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
}

export default NetworkPage;
