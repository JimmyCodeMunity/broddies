import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { toast } from "react-toastify"; // If you're using toast for notifications
import { Link } from "react-router-dom";

const ProductCard2 = ({ prod }) => {
  const { addToCart, cartItems, isLoading } = useContext(CartContext);

  const handleAddToCart = () => {
    console.log("Product being added to cart:", {
      _id: prod._id,
      artname: prod.artname,
      price: prod.price,
      image: prod.image,
      desc: prod.desc,
    });

    if (!prod._id) {
      console.error("Product ID is missing!");
      toast.error("Unable to add item to cart");
      return;
    }

    addToCart(prod);
  };

  // Check if the product is already in the cart
  const isProductInCart = cartItems.some((item) => item._id === prod._id);

  return (
    <div>
      <div className="sm:w-72 w-full bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
        <div className="">
          <img
            src={`https://server.broddiescollection.com/${prod?.image}`}
            alt="Product"
            className="h-80 w-full object-cover rounded-t-xl"
          />
          <div className="px-4 py-3 w-full">
            <span className="text-gray-400 mr-3 uppercase text-xs">Brand</span>
            <p className="text-lg font-bold text-black truncate block capitalize">
              {prod?.artname}
            </p>
            <div className="flex items-center">
              <p className="text-lg font-semibold text-black cursor-auto my-3">
                ${prod?.price}
              </p>
              <del>
                {/* <p className="text-sm text-gray-600 cursor-auto ml-2">$199</p> */}
              </del>
              <div
                className={`ml-auto cursor-pointer ${
                  isProductInCart ? "opacity-50 pointer-events-none" : ""
                }`}
                onClick={handleAddToCart}
                disabled={isProductInCart}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-bag-plus"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                  />
                  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                </svg>
              </div>
              {isProductInCart && (
                <Link to="/cart" className="text-sm text-green-500 ml-2">
                  Added to Cart
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard2;
