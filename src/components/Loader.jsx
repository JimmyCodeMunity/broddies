import React from "react";

const Loader = () => {
  return (
    <div>
      <div className="h-screen w-full flex flex-row items-center justify-center">
        <div className="py-12 w-full flex flex-col justify-center items-center">
          <div>
            <div className="w-full flex justify-center items-center">
              {/* <img className='h-40 w-auto rounded-full' src="../logo.jpg" alt="" /> */}

              <div class="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default Loader;
