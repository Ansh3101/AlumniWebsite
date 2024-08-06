import React, { useEffect } from "react";
import "./index.css";
import LandingPage from "./landing/landing";
import ContentsPage from "./contents/contents";
import DatabasePage from "./database/database";
import EventsPage from "./events/events";
import NetworkPage from "./network/network";
import StudentPage from "./student/student";
import NewStudent from "./student/new";
import AccessStudent from "./student/access";
import AlumniPage from "./alumni/alumni";
import AccessAlumni from "./alumni/access";
import NewAlumni from "./alumni/new";
import ConnectPage from "./connect/connect";
import ClassPage from "./class/class";
import BatchPage from "./batch/batch";
import UserPage from "./network/user";
import GodViewPage from "./admin/godview";

function HomePage() {
  return (
    <>
      <LandingPage />
      {/* <ContentsPage />
      <DatabasePage />
      <EventsPage />
      <NetworkPage /> */}
    </>
  );
}

function Student() {
  return (
    <>
      <StudentPage />
    </>
  );
}

function StudentSignUp() {
  return (
    <>
      <NewStudent />
    </>
  );
}

function StudentLogin() {
  return (
    <>
      <AccessStudent />
    </>
  );
}

function Alumni() {
  return (
    <>
      <AlumniPage />
    </>
  );
}

function AlumniSignUp() {
  return (
    <>
      <NewAlumni />
    </>
  );
}

function AlumniLogin() {
  return (
    <>
      <AccessAlumni />
    </>
  );
}

function Connect() {
  return (
    <>
      <ConnectPage />
    </>
  );
}

function Class() {
  return (
    <>
      <ClassPage />
    </>
  );
}

function Batch() {
  return (
    <>
      <BatchPage />
    </>
  );
}

function User() {
  return (
    <>
      <UserPage />
    </>
  );
}

function GodView() {
  return (
    <>
      <GodViewPage />
    </>
  );
}

export {
  HomePage,
  Student,
  StudentSignUp,
  StudentLogin,
  Alumni,
  AlumniSignUp,
  AlumniLogin,
  Connect,
  Class,
  Batch,
  User,
  GodView,
};
