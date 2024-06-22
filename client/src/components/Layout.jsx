// components/Layout.jsx
import React from 'react';
import Navbar from './Navbar';
import Sidebar from './SideBar';

const Layout = ({ children }) => {
  return (
    <div className="">
        <Navbar />
      <div className="flex">
      <Sidebar />
        <div className="">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
