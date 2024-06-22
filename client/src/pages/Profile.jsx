import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../slices/authSlice.js";
import { toast } from "react-toastify";
import { put } from "../api/HandleApi.js";
import { FaEdit, FaProjectDiagram, FaTasks } from "react-icons/fa";

const Profile = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    name: userInfo.displayName,
    email: userInfo.email,
    department: userInfo.department,
    image: userInfo.image,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await put("v1/profile", form);
      dispatch(setUser(data.data));
      setEditMode(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(`Error updating profile: ${error.message}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 border -z-10">
      <div className="relative max-w-4xl w-full bg-white rounded-lg shadow-md p-8">
        <div
          className="absolute top-4 right-4 cursor-pointer text-blue-500 hover:text-blue-700"
          onClick={() => setEditMode(true)}
        >
          <FaEdit size={30} />
        </div>
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Your Profile</h2>
        {!editMode ? (
          <div className="flex">
            <div className="flex-shrink-0">
              <img
                src={userInfo.image}
                alt={`${userInfo.displayName}'s profile`}
                className="w-40 h-40 rounded-full border-4 border-blue-500 shadow-lg"
              />
            </div>
            <div className="ml-8 flex-grow">
              <div className="mb-4">
                <label className="block text-gray-600 text-sm font-semibold">Name</label>
                <p className="text-gray-800 text-lg font-medium">{userInfo.displayName}</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 text-sm font-semibold">Email</label>
                <p className="text-gray-800 text-lg font-medium">{userInfo.email}</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 text-sm font-semibold">Role</label>
                <p className="text-gray-800 text-lg font-medium capitalize">{userInfo.role}</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 text-sm font-semibold">Join Date</label>
                <p className="text-gray-800 text-lg font-medium">{userInfo.joinDate}</p>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="image">
                Profile Image URL
              </label>
              <input
                type="text"
                id="image"
                name="image"
                value={form.image}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-700 transition duration-300 shadow-md"
              >
                Save
              </button>
              <button
                type="button"
                className="bg-gray-500 text-white px-6 py-3 rounded-full hover:bg-gray-700 transition duration-300 shadow-md"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
        <hr className="my-8 border-gray-200" />
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <FaProjectDiagram size={30} className="text-green-500 mr-2" />
            <h3 className="text-2xl font-bold text-gray-800">Projects</h3>
          </div>
          <button className="flex items-center bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-full transform transition-transform hover:scale-105 shadow-md">
            <FaProjectDiagram className="mr-2" /> My Projects
          </button>
        </div>
        <p className="text-gray-600 mt-2">Manage and track your projects.</p>
        <hr className="my-8 border-gray-200" />
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <FaTasks size={30} className="text-yellow-500 mr-2" />
            <h3 className="text-2xl font-bold text-gray-800">Tasks</h3>
          </div>
          <button className="flex items-center bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full transform transition-transform hover:scale-105 shadow-md">
            <FaTasks className="mr-2" /> My Tasks
          </button>
        </div>
        <p className="text-gray-600 mt-2">View and complete your tasks.</p>
      </div>
    </div>
  );
};

export default Profile;