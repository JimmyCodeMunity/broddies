import React from "react";
import { Link } from "react-router-dom";

const ProductCard1 = ({ prod }) => {
  return (
    <div>
      <Link
        to={`artview/${prod._id}`}
        state={{ prod }}
        class="mx-auto sm:mr-0 group cursor-pointer lg:mx-auto bg-white transition-all duration-500"
      >
        <div class="">
          <img
            src={`https://server.broddiescollection.com/${prod?.image}`}
            alt="face cream image"
            class="w-full aspect-square rounded-2xl object-cover"
          />
        </div>
        <div class="mt-5">
          <div class="flex items-center justify-between">
            <h6 class="font-semibold text-xl leading-8 text-black transition-all duration-500 group-hover:text-indigo-600">
              {prod?.artname}
            </h6>
            <h6 class="font-semibold text-xl leading-8 text-black">
              ${prod?.price}
            </h6>
          </div>
          <p class="mt-2 font-normal text-sm leading-6 text-gray-500">
            {prod?.desc}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard1;
