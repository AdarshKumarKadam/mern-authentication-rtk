
import React from "react";
import Navbar from "./Navbar";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import ChartComponent from "./ChartComponent";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userInfo } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   if (!userInfo && location.pathname === "/dashboard") {
  //     navigate("/login");
  //     toast.error("Please Login First!");
  //   }
  // }, [userInfo, navigate, location]);

  return (
    <>
      <Navbar screen={"dashboard"} />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <ChartComponent />
      </div>
    </>
  );
};

export default Dashboard;