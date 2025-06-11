import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { NavbarDemo } from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "../components/Loader";

const ProfilePage = () => {
  const { userdata, updateUserdata, getUserdata } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState({
    name: userdata?.username || "",
    userid: userdata?._id || "",
    email: userdata?.email || "",
    phone: userdata?.phone || "",
    address: userdata?.address || "",
  });

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // password reset
  const passwordReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!currentPassword || !newPassword || !confirmPassword) {
        setLoading(false);
        toast.error("Please fill all the password fields");
        return;
      } else if (newPassword !== confirmPassword) {
        setLoading(false);
        toast.error("Passwords do not match");
        return;
      } else {
        const response = await axios.post(
          "https://server.broddiescollection.com/api/v1/user/updatepassword",
          {
            currentPassword,
            newPassword,
            email: userDetails.email,
          }
        );
        const data = response.data;
        toast.success("Password updated successfully");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        if (token) {
          await getUserdata(token);
        }
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log("status code error", error.status);
      if (error.status == "403") {
        toast.warn("current password entered is incorrect!");
      } else if (error.status == "401") {
        toast.error("user not found.Login again and try.");
      } else {
        console.log("error during pass reset", error);
        toast.error("password reset failed.Try again later.");
      }
    }
  };

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

  const token = localStorage.getItem("user_auth_token");

  const handleUserDetailsSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "https://server.broddiescollection.com/api/v1/user/updateuser",
        {
          username: userDetails.name,
          userid: userDetails.userid,
          email: userDetails.email,
          phone: userDetails.phone,
          address: userDetails.address,
        }
      );
      const userData = response.data;
      toast.success("user profile updated");
      setLoading(false);
      if (token) {
        await getUserdata(token);
      }

      // console.log("user data collected", userData);
      // localStorage.setItem('userdata', JSON.stringify(userData)); // Store in browser
      // console.log('admin data from API:', userData);
      // }
    } catch (error) {
      setLoading(false);
      toast.error("error updating profile");
      console.error("Error fetching user data:", error);
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
      {!loading ? (
        <>
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
              <form onSubmit={passwordReset}>
                <div className="mb-4">
                  <label className="block text-gray-300">
                    Current Password
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="mt-1 block w-full border border-gray-700 rounded-md shadow-sm p-2 bg-black text-white placeholder-gray-400"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-300">New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="mt-1 block w-full border border-gray-700 rounded-md shadow-sm p-2 bg-black text-white placeholder-gray-400"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-300">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
        </>
      ) : (
        <>
          <Loader />
        </>
      )}
      <Footer />
    </div>
  );
};

export default ProfilePage;
