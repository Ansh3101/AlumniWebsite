import React from "react";
import "./events.css";
import Events from "../images/events.png";

function EventsPage() {
  return (
    <div className="events">
      <div className="eventsImage">
        <img src={Events} alt="" className="latestEvent" />
      </div>
      <div className="eventsHeading">
        <p className="eventsHeader">CIS Alumni Events</p>
        <p className="eventsSub">Events</p>
        <p className="eventsCaption">
          Spaces to gather, build, and strengthen our community.<br></br>{" "}
          Together, we explore possibilities, create opportunities, <br></br>
          spark new ideas and relationships.
        </p>
        <a href="" className="cisEvents">
          View All Events
        </a>
      </div>
    </div>
  );
}

export default EventsPage;
