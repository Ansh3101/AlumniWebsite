import React, { useEffect } from "react";
import "./class.css";
import NavBar from "../navbar/navbar";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS CSS

const images = [
  { id: "2022", title: "22", image: "/images/2022.jpg" },
  { id: "2021b", title: "21 (IB)", image: "/images/2021b.jpg" },
  { id: "2021a", title: "21 (A-Levels)", image: "/images/2021a.jpg" },
  { id: "2020b", title: "20 (IB)", image: "/images/2020b.jpg" },
  { id: "2020a", title: "20 (A-Levels)", image: "/images/2020a.jpg" },
  { id: "2019b", title: "19 (IB)", image: "/images/2019b.jpg" },
  { id: "2019a", title: "19 (A-Levels)", image: "/images/2019a.jpg" },
  // Add more image objects as needed
];

function ClassPage() {
  useEffect(() => {
    AOS.init(); // Initialize AOS animations
  }, []);

  return (
    <div>
      <NavBar page={"home"} />
      <h1 className="classesHeader">CIS Over The Years</h1>
      <div className="classContents">
        {images.map((img) => (
          <a
            key={img.id}
            href={`/class/${img.id}`}
            className="classItem"
            data-aos="fade-up"
          >
            <div className="classImageContainer">
              <img src={img.image} alt={img.title} className="classImage" />
            </div>
            <div className="classTitle">Class of '{img.title}</div>
            <div className="classCaption">Explore their profiles...</div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default ClassPage;
