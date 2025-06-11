import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ApiContext } from "../context/ApiContext";
import ProductCard2 from "./cards/ProductCard2";

const AllProducts = () => {
  const { arts } = useContext(ApiContext);
  return (
    <div className="bg-white overflow-hidden rounded-2xl">
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-manrope font-bold text-4xl text-black mb-8 max-lg:text-center">
            Product list
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {arts?.map((prod) => (
              <ProductCard2 prod={prod} />
            ))}
          </div>
        </div>

        {/* <div className="w-full text-center py-6">
                    <button
                        type="button"
                        className="py-2.5 px-6 text-sm bg-indigo-500 text-white rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-indigo-700"
                    >
                        View More
                    </button>
                </div> */}
      </section>
    </div>
  );
};

export default AllProducts;
