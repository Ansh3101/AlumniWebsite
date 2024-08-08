import React, { useEffect, useState } from "react";
import "./batch.css";
import NavBar from "../navbar/navbar";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const settings = {
  slidesToShow: 4,
  nextArrow: (
    <div>
      <div className="next-slick-arrow"> ⫸ </div>
    </div>
  ),
  prevArrow: (
    <div>
      <div className="prev-slick-arrow"> ⫷ </div>
    </div>
  ),
};

const images = [
  {
    2022: { id: "2022", title: "22", image: "/images/2022.jpg" },
    "2021b": { id: "2021b", title: "21 (IB)", image: "/images/2021b.jpg" },
    "2021a": {
      id: "2021a",
      title: "21 (A-Levels)",
      image: "/images/2021a.jpg",
    },
    "2020b": { id: "2020b", title: "20 (IB)", image: "/images/2020b.jpg" },
    "2020a": {
      id: "2020a",
      title: "20 (A-Levels)",
      image: "/images/2020a.jpg",
    },
    "2019b": { id: "2019b", title: "19 (IB)", image: "/images/2019b.jpg" },
    "2019a": {
      id: "2019a",
      title: "19 (A-Levels)",
      image: "/images/2019a.jpg",
    },
  },
  // Add other image objects as needed
];

function BatchPage() {
  const [batch, setBatch] = useState({
    id: "0",
    title: "0",
    image: "0",
  });

  const [alumniData, setAlumniData] = useState([]);

  useEffect(() => {
    const getAlumniData = async () => {
      console.log();
      console.log(Number(batch["id"].replace(/[a-zA-Z]/g, "")));
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND}/alumni/get/all`,
        {
          accessKey: process.env.REACT_APP_ACCESS_KEY,
          batch: Number(batch["id"].replace(/[a-zA-Z]/g, "")),
        }
      );
      setAlumniData(response.data.data);
      console.log(response.data.data);
    };

    setBatch(
      images[0][
        window.location.pathname.substring(
          window.location.pathname.lastIndexOf("/") + 1
        )
      ]
    );
    getAlumniData();
  }, [batch]);
  return (
    <div>
      <NavBar page={"home"} />
      <h1 className="batchHeader">Class of '{batch["title"]}</h1>
      <div className="batchContents">
        <img src={batch.image} alt={batch.title} className="batchImage" />
      </div>
      <div className="registeredAlumni">
        <h2>Registered Alumni</h2>
        <Slider {...settings} className="connectTwo">
          {alumniData.map((item) =>
            item.batch === Number(batch["id"].replace(/[a-zA-Z]/g, "")) ? (
              <a key={item.id} href={item.id} className="one">
                <div className="imgooo"></div>
                <h3 className="titleooo">
                  {item.firstName} {item.lastName}
                </h3>
                <p className="descriptionooo top">
                  {item.university}, {item.country}
                </p>
                <p className="descriptionooo">{item.batch}</p>
              </a>
            ) : null
          )}
        </Slider>
      </div>
    </div>
  );
}

export default BatchPage;
