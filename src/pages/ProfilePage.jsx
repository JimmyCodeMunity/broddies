import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { NavbarDemo } from "../components/Navbar";
import Footer from "../components/Footer";

const ProfilePage = () => {
  const { userdata, updateUserdata } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState({
    name: userdata?.username || "",
    userid: userdata?._id || "",
    email: userdata?.email || "",
    phone: userdata?.phone || "",
    address: userdata?.address || "",
  });

  const [passwordDetails, setPasswordDetails] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleUserDetailsChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordDetailsChange = (e) => {
    const { name, value } = e.target;
    setPasswordDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleUserDetailsSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("user_auth_token");
    if (token) {
      await updateUserdata(token, {
        username: userDetails.name,
        userid: userDetails.userid,
        email: userDetails.email,
        phone: userDetails.phone,
        address: userDetails.address,
      });
      console.log("User details updated:", userDetails);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordDetails.newPassword !== passwordDetails.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    const token = localStorage.getItem("user_auth_token");
    if (token) {
      await updateUserdata(token, {
        password: passwordDetails.newPassword,
      });
      console.log("Password updated:", passwordDetails);
    }
  };

  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
      <NavbarDemo />
      <div className="max-w-3xl mx-auto mt-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">
          Profile
        </h1>
        <div className="bg-black shadow rounded-lg p-6 mb-6 border border-gray-800">
          <h2 className="text-xl font-semibold mb-4 text-white">
            User Details
          </h2>
          <form onSubmit={handleUserDetailsSubmit}>
            <div className="mb-4">
              <label className="block text-gray-300">Name</label>
              <input
                type="text"
                name="name"
                value={userDetails.name}
                onChange={handleUserDetailsChange}
                className="mt-1 block w-full border border-gray-700 rounded-md shadow-sm p-2 bg-black text-white placeholder-gray-400"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300">Email</label>
              <input
                type="email"
                name="email"
                value={userDetails.email}
                onChange={handleUserDetailsChange}
                className="mt-1 block w-full border border-gray-700 rounded-md shadow-sm p-2 bg-black text-white placeholder-gray-400"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300">Phone</label>
              <input
                type="text"
                name="phone"
                value={userDetails.phone}
                onChange={handleUserDetailsChange}
                className="mt-1 block w-full border border-gray-700 rounded-md shadow-sm p-2 bg-black text-white placeholder-gray-400"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300">Address</label>
              <input
                type="text"
                name="address"
                value={userDetails.address}
                onChange={handleUserDetailsChange}
                className="mt-1 block w-full border border-gray-700 rounded-md shadow-sm p-2 bg-black text-white placeholder-gray-400"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Update User Details
            </button>
          </form>
        </div>
        <div className="bg-black shadow rounded-lg p-6 border border-gray-800">
          <h2 className="text-xl font-semibold mb-4 text-white">
            Change Password
          </h2>
          <form onSubmit={handlePasswordSubmit}>
            <div className="mb-4">
              <label className="block text-gray-300">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={passwordDetails.currentPassword}
                onChange={handlePasswordDetailsChange}
                className="mt-1 block w-full border border-gray-700 rounded-md shadow-sm p-2 bg-black text-white placeholder-gray-400"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={passwordDetails.newPassword}
                onChange={handlePasswordDetailsChange}
                className="mt-1 block w-full border border-gray-700 rounded-md shadow-sm p-2 bg-black text-white placeholder-gray-400"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordDetails.confirmPassword}
                onChange={handlePasswordDetailsChange}
                className="mt-1 block w-full border border-gray-700 rounded-md shadow-sm p-2 bg-black text-white placeholder-gray-400"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
