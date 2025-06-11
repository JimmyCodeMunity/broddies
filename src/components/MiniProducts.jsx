import React, { useContext } from "react";
import { products } from "../constants";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ApiContext } from "../context/ApiContext";
import ProductCard1 from "./cards/ProductCard1";
import ProductCard2 from "./cards/ProductCard2";

const MiniProducts = () => {
  const { getAllArt, arts } = useContext(ApiContext);
  console.log("arts", arts);
  return (
    <section className="bg-white overflow-clip rounded-2xl z-40 relative">
      <section class="py-12">
        <div className="w-full text-center py-6">
          {/* <button onClick={getAllArt} type='button' class='py-2.5 px-6 text-sm bg-indigo-500 text-white rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-indigo-700'>Get More</button> */}
        </div>
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 class="font-manrope font-bold text-4xl text-black mb-8 max-lg:text-center">
            Product list
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {arts?.slice(0, 4).map((prod, index) => {
              return <ProductCard2 prod={prod} />;
            })}
          </div>
        </div>

        <div className="w-full text-center py-6">
          <a href="/view-all-art">
            <button
              type="button"
              class="py-2.5 px-6 text-sm bg-black text-white rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-indigo-700"
            >
              View More
            </button>
          </a>
        </div>
      </section>
    </section>
  );
};

export default MiniProducts;
