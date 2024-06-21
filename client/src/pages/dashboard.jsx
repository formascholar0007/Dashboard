import React from "react";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/SideBar.jsx";

function Dashboard() {
  return (
    <>
      <section className="bg-[#F8F7F7] h-screen">
        <Navbar />
        <div className="hero">
          <Sidebar />
        </div>
      </section>
    </>
  );
}

export default Dashboard;
