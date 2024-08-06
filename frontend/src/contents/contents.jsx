import React, { useState } from "react";
import "./contents.css";
import Picture from "../images/2022.jpg";
import Picture0 from "../images/2021a.jpg";
import Picture1 from "../images/2021b.jpg";

function ContentsPage() {
  return (
    <div className="contents">
      <div
        className="class-left"
        style={{
          backgroundImage: `url(${Picture0})`,
        }}
        a
      ></div>
      <div
        className="class"
        style={{
          backgroundImage: `url(${Picture})`,
        }}
      >
        <div className="classNote">
          <div className="classText">
            <p className="classHeader">CIS CLASS OF '22</p>
            <p className="classSub">CIS Over The Years</p>
            <p className="classCaption">
              <i>The graduating batches of CIS over the years...</i>
            </p>
          </div>
          <a href="" className="explore">
            Explore More
          </a>
        </div>
      </div>
      <div
        className="class-right"
        style={{
          backgroundImage: `url(${Picture1})`,
        }}
      ></div>
    </div>
  );
}

export default ContentsPage;
