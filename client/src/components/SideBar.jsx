import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  MdDashboard,
  MdAssignment,
  MdWork,
  MdPeople,
  MdEvent,
  MdDesktopMac,
} from "react-icons/md";

const Sidebar = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  const userRole = userInfo.role;
  return (
    <div className="bg-white text-white h-[90vh] w-64">
      <ul className="border h-[100%] py-5">
        <li className="px-6 py-4 hover:bg-[#5773FF] hover:text-white text-gray-500">
          <Link to="/dashboard" className="flex items-center gap-4">
            <MdDashboard className="h-6 w-6 mr-2" />
            <span>Dashboard</span>
          </Link>
        </li>
        <li className="px-6 py-4 hover:bg-[#5773FF] hover:text-white text-gray-500">
          <Link to="/projects" className="flex items-center gap-4">
            <MdAssignment className="h-6 w-6 mr-2" />
            <span>Projects</span>
          </Link>
        </li>

        <li className="px-6 py-4 hover:bg-[#5773FF] hover:text-white text-gray-500">
          <Link to="/profile" className="flex items-center gap-4">
            <MdPeople className="h-6 w-6 mr-2" />
            <span>Profile</span>
          </Link>
        </li>
        <li className="px-6 py-4 hover:bg-[#5773FF] hover:text-white text-gray-500">
          <Link to="/myprojects" className="flex items-center gap-4">
            <MdAssignment className="h-6 w-6 mr-2" />
            <span>My Projects</span>
          </Link>
        </li>
        <li className="px-6 py-4 hover:bg-[#5773FF] hover:text-white text-gray-500">
          <Link to="/mytasks" className="flex items-center gap-4">
            <MdWork className="h-6 w-6 mr-2" />
            <span>My Tasks</span>
          </Link>
        </li>
        {userRole && userRole === "admin" && (
          <>
            <li className="px-6 py-4  hover:text-white text-gray-500">
              <Link to="/admin" className="flex items-center gap-4">
                <span className="text-gray-500 font-bold text-lg">Admin</span>
              </Link>
            </li>
            <li className="px-6 py-4 hover:bg-[#5773FF] hover:text-white text-gray-500">
              <Link to="/employees" className="flex items-center gap-4">
                <MdPeople className="h-6 w-6 mr-2" />
                <span>Employees</span>
              </Link>
            </li>
            <li className="px-6 py-4 hover:bg-[#5773FF] hover:text-white text-gray-500">
              <Link to="/admin/projects" className="flex items-center gap-4">
                <MdAssignment className="h-6 w-6 mr-2" />
                <span>Projects</span>
              </Link>
            </li>
            <li className="px-6 py-4 hover:bg-[#5773FF] hover:text-white text-gray-500">
              <Link to="/revenue" className="flex items-center gap-4">
                <MdDesktopMac className="h-6 w-6 mr-2" />
                <span>Revenue</span>
              </Link>
            </li>
            <li className="px-6 py-4 hover:bg-[#5773FF] hover:text-white text-gray-500">
              <Link to="/tasks" className="flex items-center gap-4">
                <MdWork className="h-6 w-6 mr-2" />
                <span>Tasks</span>
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
