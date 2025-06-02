import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../Loader";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const { userregister } = useContext(AuthContext);
  const [username, setUsername] = useState("Test");
  const [email, setEmail] = useState("dev.jimin02@gmail.com");
  const [phone, setPhone] = useState("2038534534");
  const [address, setAddress] = useState("Nairobi");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    const success = await userregister(
      email,
      password,
      username,
      phone,
      address
    ); // Await login response

    if (success) {
      setLoading(false);
      toast.success("Account created successfully");
      navigate("/login"); // Navigate only after success
    } else {
      setLoading(false);
      toast.error("Login failed. Check credentials");
    }

    setLoading(false);
  };
  return (
    <div>
      <div class="relative py-3 sm:max-w-xl sm:mx-auto">
        {!loading ? (
          <div class="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
            <div class="max-w-md mx-auto">
              <form action="" onSubmit={handleRegister} className="w-full">
                <div class="flex items-center space-x-5 justify-center">
                  <h1 className="text-xl">Create Account</h1>
                </div>
                <div class="mt-5">
                  <label
                    class="font-semibold text-sm text-gray-600 pb-1 block"
                    for="login"
                  >
                    Username
                  </label>
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                    type="text"
                    id="login"
                    placeholder="enter username"
                  />
                  <label
                    class="font-semibold text-sm text-gray-600 pb-1 block"
                    for="login"
                  >
                    E-mail
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                    type="email"
                    id="login"
                    placeholder="enter email"
                  />
                  <label
                    class="font-semibold text-sm text-gray-600 pb-1 block"
                    for="login"
                  >
                    Phone
                  </label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                    type="text"
                    id="login"
                    placeholder="enter Phone"
                  />
                  <label
                    class="font-semibold text-sm text-gray-600 pb-1 block"
                    for="login"
                  >
                    Address
                  </label>
                  <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                    type="text"
                    id="login"
                    placeholder="enter address"
                  />
                  <label
                    class="font-semibold text-sm text-gray-600 pb-1 block"
                    for="password"
                  >
                    Password
                  </label>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                    type="password"
                    id="password"
                    placeholder="enter password"
                  />
                </div>
                <div class="text-right mb-4">
                  <a
                    class="text-xs font-display font-semibold text-gray-500 hover:text-gray-600 cursor-pointer"
                    href="#"
                  >
                    Forgot Password?
                  </a>
                </div>
                <div class="flex justify-center w-full items-center"></div>
                <div class="mt-5">
                  <button
                    class="py-2 px-4 bg-black hover:bg-neutral-900 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                    type="submit"
                  >
                    Sign Up
                  </button>
                </div>
              </form>
              <div class="flex items-center justify-between mt-4">
                <span class="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                <Link
                  class="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
                  href="/login"
                >
                  or sign In
                </Link>
                <span class="w-1/5 border-b dark:border-gray-400 md:w-1/4"></span>
              </div>
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default RegisterForm;
