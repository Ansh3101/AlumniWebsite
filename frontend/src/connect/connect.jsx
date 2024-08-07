import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./connect.css";
import Logo from "../images/logo-bg.png";
import Students from "../images/students.png";
import { AsyncStorage } from "reactjs-async-localstorage";
import Slider from "react-slick";
import axios from "axios";
import { FaFilter } from "react-icons/fa";
import NavBar from "../navbar/navbar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ConnectPage() {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    batch: 0,
    countries: [],
    email: "",
    password: "",
    verified: false,
  });

  const [alumniData, setAlumniData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [filterType, setFilterType] = useState("university"); // Default filter type
  const [filterValue, setFilterValue] = useState("");

  const getAlumniData = async (filter = null) => {
    console.log("Fetching alumni data", filter);
    const body = { accessKey: process.env.REACT_APP_ACCESS_KEY };
    if (filter) {
      body.filter = filter;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND}/alumni/get/all`,
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
        `${process.env.REACT_APP_BACKEND}/students/get/all`,
        { accessKey: process.env.REACT_APP_ACCESS_KEY }
      );
      setStudentData(response.data.data);
      console.log("Student data:", response.data.data);
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  const isFilterActive = filterType !== "university" || filterValue !== "";

  const resetFilters = () => {
    setFilterType("university");
    setFilterValue("");
    getAlumniData();
  };

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

  const [loggedIn, setLoggedIn] = useState(false);
  const [type, setType] = useState("NA");

  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = async () => {
      console.log("Checking login status");
      if (!(await AsyncStorage.getItem("studentLogin"))) {
        await AsyncStorage.setItem("studentLogin", "false");
      }
      if (JSON.parse(await AsyncStorage.getItem("studentLogin"))) {
        setLoggedIn(JSON.parse(await AsyncStorage.getItem("studentLogin")));
        console.log("Student logged in:", loggedIn);
        if (loggedIn) {
          if (await AsyncStorage.getItem("studentDetails")) {
            setData(JSON.parse(await AsyncStorage.getItem("studentDetails")));
            setType("Student");
            console.log("Student data:", data);
          }
        }
      } else if (JSON.parse(await AsyncStorage.getItem("alumniLogin"))) {
        setLoggedIn(JSON.parse(await AsyncStorage.getItem("alumniLogin")));
        console.log("Alumni logged in:", loggedIn);
        if (loggedIn) {
          if (await AsyncStorage.getItem("alumniDetails")) {
            setData(JSON.parse(await AsyncStorage.getItem("alumniDetails")));
            setType("Alumni");
            console.log("Alumni data:", data);
          }
        }
      }
    };

    try {
      checkLogin();
      getAlumniData();
      getStudentData();
    } catch (e) {
      console.log(e);
    }
  }, [loggedIn]);

  const handleItemClick = (item, type) => {
    console.log("Item clicked:", item, type);
    navigate(
      type === "Student" ? `/student/${item._id}` : `/alumni/${item._id}`,
      {
        state: item,
      }
    );
  };

  const toggleFilterOptions = () => setShowFilterOptions(!showFilterOptions);

  const getFilteredUniversityAlumniData = (university) => {
    return alumniData.filter((alumni) => alumni.university === university);
  };

  const getFilteredBatchAlumniData = (batch) => {
    console.log("Batch:", batch);
    console.log(alumniData.filter((alumni) => alumni.batch === Number(batch)));
    return alumniData.filter((alumni) => alumni.batch === Number(batch));
  };

  const getFilteredCountryAlumniData = (country) => {
    console.log("Country:", country);
    return alumniData.filter((alumni) => alumni.country === country);
  };

  const applyFilter = (filterType, filterValue) => {
    let filteredData = [];
    switch (filterType) {
      case "university":
        filteredData = getFilteredUniversityAlumniData(filterValue);
        break;
      case "batch":
        filteredData = getFilteredBatchAlumniData(filterValue);
        break;
      case "country":
        console.log(filterValue);
        filteredData = getFilteredCountryAlumniData(filterValue);
        console.log("Fdata", filteredData);
        break;
      default:
        console.error("Invalid filter type");
        return;
    }
    // Assuming you have a state or method to update the displayed data
    setAlumniData(filteredData);
  };

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
  };

  const handleFilterValueChange = (e) => {
    setFilterValue(e.target.value);
  };

  const handleApplyFilter = () => {
    applyFilter(filterType, filterValue);
  };

  const getUniqueFilterOptions = (type) => {
    const allValues = alumniData.map((item) => item[type]);
    let uniqueValues = Array.from(new Set(allValues));

    if (type === "batch") {
      uniqueValues.sort((a, b) => b - a);
    } else {
      uniqueValues.sort();
    }
    console.log("Unique values before adding 'Select':", uniqueValues);
    uniqueValues.unshift("Select");
    console.log("Unique values after adding 'Select':", uniqueValues);
    return uniqueValues;
  };

  return (
    <div>
      <NavBar page={"home"} />
      <div className="connect">
        {loggedIn ? (
          <>
            <div className="connectBar">
              <h1 className="studentHeader">The CIS Connect</h1>
              <button
                className="profileLink"
                onClick={() =>
                  navigate(type === "Student" ? "/student" : "/alumni", {
                    state: data,
                  })
                }
              >
                {data.firstName + " " + data.lastName}
              </button>
            </div>
            {data.verified ? (
              <>
                {showFilterOptions && (
                  <div className="filterSection">
                    <label className="filterLabel">Filter Type</label>
                    <select
                      value={filterType}
                      onChange={handleFilterTypeChange}
                      className="filterSelect"
                    >
                      <option value="university">University</option>
                      <option value="batch">Batch</option>
                      <option value="country">Country</option>
                    </select>
                    <label className="filterLabel">Filter Value</label>
                    {filterType && (
                      <select
                        value={filterValue}
                        className="filterSelect"
                        onChange={handleFilterValueChange}
                      >
                        {getUniqueFilterOptions(filterType).map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    )}
                    <button
                      onClick={handleApplyFilter}
                      className="filterButton"
                    >
                      Apply Filter
                    </button>
                    <button
                      className="filterResetButton"
                      onClick={resetFilters}
                      disabled={!isFilterActive}
                    >
                      Reset Filters
                    </button>
                  </div>
                )}
                <div className="connectDetails">
                  <div className="connectHeader">
                    <p className="connecth1">Alumni</p>
                    <div
                      onClick={toggleFilterOptions}
                      style={{
                        cursor: "pointer",
                        display: "flex",
                        width: "100px",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                      }}
                    >
                      <FaFilter size={18} />
                      <p>Filter</p>
                    </div>
                  </div>
                  {alumniData.length > 0 ? (
                    <Slider
                      {...(alumniData.length >= 4 ? settings : altSettings)}
                      className="connectOne"
                    >
                      {alumniData.map((item) => (
                        <button
                          key={item._id}
                          onClick={() => handleItemClick(item, "Alumni")}
                          className="one"
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
                      <h3 style={{ textAlign: "center" }}>
                        No Data To Display
                      </h3>
                    </>
                  )}
                </div>
                <div className="connectDetails2">
                  <div className="connectHeader">
                    <p className="connecth1">Students</p>
                  </div>
                  {studentData.length > 0 ? (
                    <Slider {...settings} className="connectOne">
                      {studentData.map((item) => (
                        <button
                          key={item._id}
                          onClick={() => handleItemClick(item, "Student")}
                          className="two"
                        >
                          <div className="img2"></div>
                          <h2 className="title">
                            {item.firstName} {item.lastName}
                          </h2>
                          <p className="description top">
                            {[...new Set(JSON.parse(item.countries))].length ===
                            0
                              ? "Country Not Provided"
                              : [...new Set(JSON.parse(item.countries))]}
                          </p>
                          <p className="description">{item.batch}</p>
                        </button>
                      ))}
                    </Slider>
                  ) : (
                    <>
                      <h3 style={{ textAlign: "center" }}>
                        No Data To Display
                      </h3>
                    </>
                  )}
                </div>
              </>
            ) : (
              <div className="notVerified">
                <h2>Verification Pending</h2>
                <p>
                  You must be verified to be able to access the CIS Network.
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="notVerifiedConnect">
            <h1 className="notVerifiedHeader">The CIS Connect</h1>
            <h2>Not Logged In</h2>
            <p>
              You must be a registered and verified student/alumni to be able to
              access the CIS Network.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ConnectPage;
