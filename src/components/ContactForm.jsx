import React from "react";

const ContactForm = () => {
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
              <h2 class="text-indigo-500 font-manrope text-4xl font-semibold leading-10 mb-11">
                Send Us A Message
              </h2>
              <input
                type="text"
                class="w-full h-12 text-white placeholder-gray-400 bg-transparent text-lg font-normal leading-7 rounded-full border border-gray-600 focus:outline-none pl-4 mb-10"
                placeholder="Name"
              />
              <input
                type="text"
                class="w-full h-12 text-white placeholder-gray-400 bg-transparent text-lg font-normal leading-7 rounded-full border border-gray-600 focus:outline-none pl-4 mb-10"
                placeholder="Email"
              />
              <input
                type="text"
                class="w-full h-12 text-white placeholder-gray-400 bg-transparent text-lg font-normal leading-7 rounded-full border border-gray-600 focus:outline-none pl-4 mb-10"
                placeholder="Phone"
              />

              <div class="mb-10">
                <h4 class="text-gray-400 text-lg font-normal leading-7 mb-4">
                  Preferred method of communication
                </h4>
                <div class="flex">
                  <div class="flex items-center mr-11">
                    <input
                      id="radio-group-1"
                      type="radio"
                      name="radio-group"
                      class="hidden peer"
                    />
                    <label
                      for="radio-group-1"
                      class="flex items-center cursor-pointer text-gray-400 text-base font-normal leading-6 peer-checked:text-indigo-500"
                    >
                      <span class="border border-gray-600 rounded-full mr-2 w-4 h-4 flex items-center justify-center">
                        <span class="w-2 h-2 bg-indigo-500 rounded-full scale-0 peer-checked:scale-100 transition-transform"></span>
                      </span>{" "}
                      Email
                    </label>
                  </div>
                  <div class="flex items-center">
                    <input
                      id="radio-group-2"
                      type="radio"
                      name="radio-group"
                      class="hidden peer"
                    />
                    <label
                      for="radio-group-2"
                      class="flex items-center cursor-pointer text-gray-400 text-base font-normal leading-6 peer-checked:text-indigo-500"
                    >
                      <span class="border border-gray-600 rounded-full mr-2 w-4 h-4 flex items-center justify-center">
                        <span class="w-2 h-2 bg-indigo-500 rounded-full scale-0 peer-checked:scale-100 transition-transform"></span>
                      </span>{" "}
                      Phone
                    </label>
                  </div>
                </div>
              </div>

              <input
                type="text"
                class="w-full h-12 text-white placeholder-gray-400 bg-transparent text-lg font-normal leading-7 rounded-full border border-gray-600 focus:outline-none pl-4 mb-10"
                placeholder="Message"
              />
              <button class="w-full h-12 text-white text-base font-semibold leading-6 rounded-full transition-all duration-700 hover:bg-indigo-800 bg-indigo-600 shadow-sm">
                Send
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactForm;
