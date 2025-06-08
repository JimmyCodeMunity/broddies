import React, { useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cartItems, cartTotal, removeFromCart, updateQuantity } = useContext(CartContext);
  const { isUserAuthenticated, userdata } = useContext(AuthContext);

  useEffect(() => {
    console.log("Cart Items:", cartItems);
    console.log("Cart Total:", cartTotal);
    console.log("User Auth Status:", isUserAuthenticated);
    console.log("User Data:", userdata);
  }, [cartItems, cartTotal, isUserAuthenticated, userdata]);

  if (!isUserAuthenticated) {
    return (
      <div className='bg-white min-h-[60vh] flex flex-col items-center justify-center'>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Please login to view your cart</h2>
        <Link to="/login" className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-gray-900 px-12 py-3 text-base font-bold text-white transition-all duration-200 ease-in-out hover:bg-gray-800">
          Login
        </Link>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className='bg-white min-h-[60vh] flex flex-col items-center justify-center'>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
        <Link to="/view-all-art" className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-gray-900 px-12 py-3 text-base font-bold text-white transition-all duration-200 ease-in-out hover:bg-gray-800">
          Continue Shopping
        </Link>
      </div>
    );
  }
    
  return (
    <div className='bg-white min-h-[60vh] py-12'>
      <section className="relative z-10 after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0 after:bg-gray-50">
        <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto relative z-10">
          <div className="grid grid-cols-12">
            <div className="col-span-12 xl:col-span-8 lg:pr-8 pt-14 pb-8 lg:py-24 w-full max-xl:max-w-3xl max-xl:mx-auto">
              <div className="flex items-center justify-between pb-8 border-b border-gray-300">
                <h2 className="font-manrope font-bold text-3xl leading-10 text-black">Shopping Cart</h2>
                <h2 className="font-manrope font-bold text-xl leading-8 text-gray-600">{cartItems.length} Items</h2>
              </div>

              <div className="grid grid-cols-12 mt-8 max-md:hidden pb-6 border-b border-gray-200">
                <div className="col-span-12 md:col-span-7">
                  <p className="font-normal text-lg leading-8 text-gray-400">Product Details</p>
                </div>
                <div className="col-span-12 md:col-span-5">
                  <div className="grid grid-cols-5">
                    <div className="col-span-3">
                      <p className="font-normal text-lg leading-8 text-gray-400 text-center">Quantity</p>
                    </div>
                    <div className="col-span-2">
                      <p className="font-normal text-lg leading-8 text-gray-400 text-center">Total</p>
                    </div>
                  </div>
                </div>
              </div>

              {cartItems.map((item) => (
                <div key={item._id} className="flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6 border-b border-gray-200 group">
                  <div className="w-full md:max-w-[126px]">
                    <img 
                      src={`https://broddie.menthealventures.com/${item.image}`} 
                      alt={item.artname} 
                      className="mx-auto rounded-xl object-cover"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 w-full">
                    <div className="md:col-span-2">
                      <div className="flex flex-col max-[500px]:items-center gap-3">
                        <h6 className="font-semibold text-base leading-7 text-black">{item.artname}</h6>
                        <h6 className="font-normal text-base leading-7 text-gray-500">{item.desc}</h6>
                        <h6 className="font-medium text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-indigo-600">${item.price}</h6>
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className="p-2 border rounded-lg hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="p-2 border rounded-lg hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-lg leading-8 text-gray-600 text-center transition-all duration-300 group-hover:text-indigo-600">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="mt-8 flex flex-col items-end">
                <div className="w-full max-w-md">
                  <div className="flex justify-between mb-4">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold">Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between border-t pt-4">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-lg font-bold">${cartTotal.toFixed(2)}</span>
                  </div>
                  <button className="w-full mt-6 bg-gray-900 text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors">
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;
