import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Send } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import Loader from "./Loader";
const ContactForm = () => {
  const { userdata } = useContext(AuthContext);
  const [name, setName] = useState(userdata?.username || "");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleContact = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!name || !email || !phone || !message) {
        toast.error("Please fill all fields");
        return;
      } else {
        const response = await axios.post(
          "https://server.broddiescollection.com/api/v1/user/contactadmin",
          {
            name,
            email,
            phone,
            message,
          }
        );
        const data = response.data;
        toast.success("Message sent successfully");
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error sending message");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full bg-black">
      <section class="py-24 bg-black text-white">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="grid lg:grid-cols-2 grid-cols-1">
            <div class="lg:mb-0 mb-10">
              <div class="group w-full h-full">
                <div class="relative h-full">
                  <img
                    class="w-full h-full object-cover lg:rounded-l-2xl rounded-2xl"
                    src="../images/broddie.jpeg"
                  />
                  <h1 class="font-manrope text-white text-4xl font-bold leading-10 absolute top-11 left-11">
                    Contact us
                  </h1>
                  <div class="absolute bottom-0 w-full lg:p-11 p-5">
                    <div class="bg-zinc-900 rounded-lg p-6 block">
                      <a href="javascript:;" class="flex items-center mb-6">
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 0 30 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="..."
                            stroke="#6366F1"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        <h5 class="text-white text-base font-normal leading-6 ml-5">
                          +254746269722
                        </h5>
                      </a>
                      <a href="javascript:;" class="flex items-center mb-6">
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 0 30 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="..."
                            stroke="#6366F1"
                            stroke-width="2"
                            stroke-linecap="round"
                          />
                        </svg>
                        <h5 class="text-white text-base font-normal leading-6 ml-5">
                          victorkaranja913@gmail.com
                        </h5>
                      </a>
                      <a href="javascript:;" class="flex items-center">
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 0 30 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="..." stroke="#6366F1" stroke-width="2" />
                          <path d="..." stroke="#6366F1" stroke-width="2" />
                        </svg>
                        <h5 class="text-white text-base font-normal leading-6 ml-5">
                          Nairobi,Kenya
                        </h5>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-zinc-900 p-5 lg:p-11 lg:rounded-r-2xl rounded-2xl">
              {loading ? (
                <Loader />
              ) : (
                <form action="" method="post" onSubmit={handleContact}>
                  <h2 class="text-indigo-500 font-manrope text-4xl font-semibold leading-10 mb-11">
                    Send Us A Message
                  </h2>
                  <input
                    type="text"
                    class="w-full h-12 text-white placeholder-gray-400 bg-transparent text-lg font-normal leading-7 rounded-full border border-gray-600 focus:outline-none pl-4 mb-10"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    type="text"
                    class="w-full h-12 text-white placeholder-gray-400 bg-transparent text-lg font-normal leading-7 rounded-full border border-gray-600 focus:outline-none pl-4 mb-10"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="text"
                    class="w-full h-12 text-white placeholder-gray-400 bg-transparent text-lg font-normal leading-7 rounded-full border border-gray-600 focus:outline-none pl-4 mb-10"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />

                  <textarea
                    id="message"
                    rows="4"
                    class="block mb-4 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write your thoughts here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                  <button
                    type="submit"
                    class="w-full h-12 text-white flex items-center justify-center gap-2 text-base font-semibold leading-6 rounded-full transition-all duration-700 hover:bg-neutral-800 bg-black shadow-sm"
                  >
                    <Send color="white" size={15} />
                    Send
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactForm;
