import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import {
  HomePage,
  Student,
  StudentSignUp,
  StudentLogin,
  Alumni,
  AlumniLogin,
  AlumniSignUp,
  Connect,
  Class,
  Batch,
  User,
  GodView,
} from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="student" element={<Student />} />
      <Route path="student/new" element={<StudentSignUp />} />
      <Route path="student/access" element={<StudentLogin />} />
      <Route path="student/*" element={<User />} />
      <Route path="alumni" element={<Alumni />} />
      <Route path="alumni/new" element={<AlumniSignUp />} />
      <Route path="alumni/access" element={<AlumniLogin />} />
      <Route path="alumni/*" element={<User />} />
      <Route path="connect" element={<Connect />} />
      <Route path="class" element={<Class />} />
      <Route path="class/*" element={<Batch />} />
      <Route path="admin" element={<GodView />} />
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
