import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./godview.css";
import Logo from "../images/logo-bg.png";
import Students from "../images/students.png";
import { AsyncStorage } from "reactjs-async-localstorage";
import Slider from "react-slick";
import axios from "axios";
import { FaFilter, FaWindowClose } from "react-icons/fa";
import NavBar from "../navbar/navbar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const GodViewPage = () => {
  const [adminKey, setAdminKey] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [alumniData, setAlumniData] = useState([]);
  const [studentData, setStudentData] = useState([]);

  const body = {
    accessKey: process.env.REACT_APP_ACCESS_KEY,
    verified: false,
  };

  const getAlumniData = async (filter = null) => {
    console.log("Fetching alumni data", filter);

    if (filter) {
      body.filter = filter;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/alumni/get/all",
        body
      );
      setAlumniData(response.data.data);
      console.log("Alumni data:", response.data.data);
    } catch (error) {
      console.error("Error fetching alumni data:", error);
    }
  };

  const getStudentData = async () => {
    console.log("Fetching student data");
    try {
      const response = await axios.post(
        "http://localhost:8000/api/students/get/all",
        body
      );
      setStudentData(response.data.data);
      console.log("Student data:", response.data.data);
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  const navigate = useNavigate();

  const settings = {
    slidesToShow: 4,
    slidesToScroll: 4,
    infinite: true,
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

  const altSettings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: false,
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

  useEffect(() => {
    try {
      getAlumniData();
      getStudentData();
    } catch (e) {
      console.log(e);
    }
  }, []);

  const handleKeyChange = (event) => {
    setAdminKey(event.target.value);
  };

  const verifyKey = () => {
    if (adminKey === process.env.REACT_APP_ADMIN_KEY) {
      setIsVerified(true);
    } else {
      alert("Invalid admin key.");
    }
  };

  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = (item) => {
    setSelectedItem(item);
    console.log("Selected item:", item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const verify = async (item) => {
    try {
      if (item.university) {
        const response = await axios.post(
          "http://localhost:8000/api/alumni/verification",
          {
            accessKey: process.env.REACT_APP_ACCESS_KEY,
            adminKey: process.env.REACT_APP_ADMIN_KEY,
            email: item.email,
          }
        );
        console.log(response.data);
        await alert("Verification successful!");
        await window.location.reload();
      } else {
        const response = await axios.post(
          "http://localhost:8000/api/students/verification",
          {
            accessKey: process.env.REACT_APP_ACCESS_KEY,
            adminKey: process.env.REACT_APP_ADMIN_KEY,
            email: item.email,
          }
        );
        console.log(response.data);
        await alert("Verification successful!");
        await window.location.reload();
      }
    } catch (error) {
      console.error("Error verifying:", error);
    }
  };

  return (
    <div>
      {!isVerified ? (
        <div>
          <h2>Enter Your Admin Key</h2>
          <input type="password" value={adminKey} onChange={handleKeyChange} />
          <button onClick={verifyKey}>Verify</button>
        </div>
      ) : (
        <>
          <div>
            <h1 style={{ textAlign: "center", marginTop: "5%" }}>Admin View</h1>
            <div className="connectHeader">
              <p className="connecth1">Alumni To Verify</p>
            </div>
            {alumniData.length > 0 ? (
              <Slider
                {...(alumniData.length >= 4 ? settings : altSettings)}
                className="connectOne"
              >
                {alumniData.map((item) => (
                  <button
                    key={item._id}
                    className="one"
                    onClick={() => openModal(item)}
                  >
                    <div className="img"></div>
                    <h2 className="title">
                      {item.firstName} {item.lastName}
                    </h2>
                    <p className="description top">
                      {item.university}, {item.country}
                    </p>
                    <p className="description">{item.batch}</p>
                  </button>
                ))}
              </Slider>
            ) : (
              <>
                <h3 style={{ textAlign: "center" }}>No Data To Display</h3>
              </>
            )}
          </div>
          <div className="connectHeader" style={{ marginTop: "2%" }}>
            <p className="connecth1">Students To Verify</p>
          </div>
          {studentData.length > 0 ? (
            <Slider
              {...(studentData.length >= 4 ? settings : altSettings)}
              className="connectOne"
            >
              {studentData.map((item) => (
                <button
                  key={item._id}
                  className="two"
                  onClick={() => openModal(item)}
                >
                  <div className="img2"></div>
                  <h2 className="title">
                    {item.firstName} {item.lastName}
                  </h2>
                  <p className="description top">
                    {[...new Set(JSON.parse(item.countries))].length === 0
                      ? "Country Not Provided"
                      : [...new Set(JSON.parse(item.countries))]}
                  </p>
                  <p className="description">{item.batch}</p>
                </button>
              ))}
            </Slider>
          ) : (
            <>
              <h3 style={{ textAlign: "center" }}>No Data To Display</h3>
            </>
          )}

          {selectedItem && (
            <div className={alumniData.length > 0 ? "modal" : "modal-2"}>
              <div className="modal-content">
                <span
                  className="close"
                  onClick={closeModal}
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <FaWindowClose />
                </span>
                <h2>
                  {selectedItem.firstName} {selectedItem.lastName}
                </h2>
                {selectedItem.university ? (
                  <>
                    <h4>Email: {selectedItem.email}</h4>
                    <h4>Batch: {selectedItem.batch}</h4>
                    <h4>Country: {selectedItem.country}</h4>
                    <h4>University: {selectedItem.university}</h4>
                  </>
                ) : (
                  <>
                    <h4>Email: {selectedItem.email}</h4>
                    <h4>Batch: {selectedItem.batch}</h4>
                    <h4>
                      {" "}
                      {JSON.parse(selectedItem.countries).length > 0
                        ? JSON.parse(selectedItem.countries).join(", ")
                        : "No Country Provided"}
                    </h4>
                  </>
                )}
                <button
                  className="verifyButton"
                  onClick={() => verify(selectedItem)}
                  style={{ marginTop: "12%" }}
                >
                  Verify
                </button>{" "}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GodViewPage;
