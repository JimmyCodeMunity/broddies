import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [authtoken, setAuthtoken] = useState(null);
  const [userdata, setUserdata] = useState(null);

  // const adminlogin = async (email, password) => {
  //     setLoading(true)
  //     console.log("details", email, password)
  //     try {
  //         const response = await axios.post("http://localhost:5000/api/v1/admin/adminlogin", { email, password });
  //         const data = response.data;
  //         console.log("log data", data)
  //         setIsAdminAuthenticated(true);
  //         setLoading(false);
  //         localStorage.setItem("ad_auth_token", data.token)
  //         localStorage.setItem("ad_authenticated", true)
  //         setAuthtoken(data.token);
  //         getAdmindata(data?.token)
  //     } catch (error) {
  //         setLoading(false)
  //         // console.log("error",error)
  //         if (error.status == 400) {
  //             toast.error("Account does not exist")
  //             console.log(error.response.data.message);
  //         }

  //     }
  // }

  // Fetch user data using token

  const userregister = async (email,password,address,phone,username) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/user/createuser",
        { email,password,address,phone,username }
      );
      console.log(email,password,address,phone,username)
      const data = response.data;
    //   setIsAdminAuthenticated(true);
      setLoading(false);
    //   localStorage.setItem("ad_auth_token", data.token);
    //   localStorage.setItem("ad_authenticated", true);
    //   setAuthtoken(data.token);
    //   await getAdmindata(data?.token);
      return true; // Login successful
    } catch (error) {
      setLoading(false);
      console.log("error",error)
      if (error.response && error.response.status == 400) {
        toast.error("Account does not exist");
      } else if (error.response && error.response.status == 401) {
        toast.error("Invalid Password");
      } else {
        toast.error("Login failed. Please check credentials.");
      }
      return false; // Login failed
    }
  };

  const userlogin = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/user/userlogin",
        { email, password }
      );
      const data = response.data;
      setIsUserAuthenticated(true);
      setLoading(false);
      localStorage.setItem("user_auth_token", data.token);
      localStorage.setItem("user_authenticated", true);
      setAuthtoken(data.token);
      await getUserdata(data?.token);
      return true; // Login successful
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status == 400) {
        toast.error("Account does not exist");
      } else if (error.response && error.response.status == 401) {
        toast.error("Invalid Password");
      } else {
        toast.error("Login failed. Please check credentials.");
      }
      return false; // Login failed
    }
  };

  const getUserdata = async (token) => {
    try {
      if (token) {
        const response = await axios.post(
          `http://localhost:5000/api/v1/user/getuserdata`,
          { token }
        );
        const userData = response.data;
        setUserdata(userData);
        console.log("user data collected",userData)
        // localStorage.setItem('userdata', JSON.stringify(userData)); // Store in browser
        // console.log('admin data from API:', userData);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = localStorage.getItem("user_auth_token");
        const isLogged = JSON.parse(localStorage.getItem("user_authenticated"));

        if (token) {
          setAuthtoken(token);
          await getUserdata(token);
        }

        if (token && isLogged) {
          setIsUserAuthenticated(true);
          await getUserdata(token);
        }
      } catch (error) {
        console.log("error occuredd");
        setLoading(false);
      }
      setLoading(false);
    };
    checkLoginStatus();
  }, []);

  const logout = () => {
    setIsUserAuthenticated(false);
    setAuthtoken(null);
    setUserdata(null);
    // setAuthUser(null);
    localStorage.removeItem("user_auth_token");
    localStorage.removeItem("user_authenticated");
  };
  return (
    <AuthContext.Provider
      value={{
        userlogin,
        isUserAuthenticated,
        setIsUserAuthenticated,
        logout,
        userdata,
        setLoading,
        getUserdata,
        loading,
        userregister
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
