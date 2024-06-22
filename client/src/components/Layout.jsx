import React from "react";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/SideBar.jsx";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <section className="bg-[#F8F7F7] h-screen">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="p-6 w-screen">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default Layout;
