import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, setUser } from "../slices/authSlice.js";
import { BiSearch, BiUserPlus, BiLogOut } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";
import { post, put } from "../api/HandleApi.js";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [secretKey, setSecretKey] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await post("logout");
      dispatch(clearUser());
      toast.success(`Logged Out`);
      navigate('/')
    } catch (error) {
      toast.error(`Something Went Wrong while Logging Out`);
      console.error("Logout error:", error);
    }
  };

  const handleChangeRole = async (updatedRole) => {
    try {
      const data = await put("v1/profile", { secretKey, role: updatedRole });
      dispatch(setUser(data.data));
      setModalVisible(false);
      toast.success(`Now you are ${data.data.role}`);
    } catch (err) {
      toast.error(`Error updating role: ${err.message}`);
    }
  };

  const handleOpenModal = () => {
    if (userInfo.role === "admin") {
      handleChangeRole("user");
    } else {
      setModalVisible(true);
      setSecretKey("");
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <>
      <nav className="bg-white flex items-center justify-between p-4 shadow">
        <div className="flex items-center">
          <div className="text-2xl font-bold flex items-center">
            <span className="text-[#5773FF]">DashBoard</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search here..."
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
          <BiSearch className="h-6 w-6 hover:text-[#5773FF] text-gray-400" />
          {userInfo && (
            <div className="relative">
              <div
                className="flex items-center space-x-2 bg-white cursor-pointer"
                onClick={toggleDropdown}
              >
                <img
                  src={userInfo.image}
                  alt="User Avatar"
                  className="h-8 w-8 rounded-full"
                />
                <span className="text-gray-700">{userInfo.displayName}</span>
                <svg
                  className="h-5 w-5 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.707a1 1 0 011.414-1.414L10 9.586l3.293-3.293a1 1 0 111.414 1.414L10 12.414l-4.707-4.707z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              {dropdownVisible && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-2 z-20">
                  <button
                    onClick={handleOpenModal}
                    className="px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left flex items-center space-x-2"
                  >
                    <BiUserPlus className="h-5 w-5" />
                    <span>
                      {userInfo.role === "admin"
                        ? "Become A User"
                        : "Become An Admin"}
                    </span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left flex items-center space-x-2"
                  >
                    <BiLogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
      {modalVisible && userInfo.role !== "admin" && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg relative w-1/3">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={handleCloseModal}
            >
              <AiOutlineClose className="h-6 w-6" />
            </button>
            <h2 className="text-xl font-bold mb-4">Become an Admin</h2>
            <p>Enter the secret key to change your role:</p>
            <input
              type="password"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 mt-2"
            />
            <div className="mt-4">
              <button
                onClick={() => handleChangeRole("admin")}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              >
                Confirm
              </button>
              <button
                onClick={handleCloseModal}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
