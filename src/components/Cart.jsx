import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import CheckoutModal from './checkout/CheckoutModal';

const Cart = () => {
  const { cartItems, cartTotal, removeFromCart, updateQuantity, isLoading } = useContext(CartContext);
  const { isUserAuthenticated } = useContext(AuthContext);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  useEffect(() => {
    console.log("Cart Items:", cartItems);
    console.log("Cart Total:", cartTotal);
  }, [cartItems, cartTotal]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (!isUserAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h2 className="text-2xl font-bold text-center mb-6">Please Login</h2>
          <Link 
            to="/login"
            className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors flex items-center justify-center"
          >
            Login to View Cart
          </Link>
        </div>
      </div>
    );
  }

  if (!cartItems?.length) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h2 className="text-2xl font-bold text-center mb-6">Your Cart is Empty</h2>
          <Link 
            to="/view-all-art"
            className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors flex items-center justify-center"
          >
            Browse Art
          </Link>
        </div>
      </div>
    );
  }

  // Calculate subtotal and total
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingCost = 0; // You can modify this based on your shipping logic
  const total = subtotal + shippingCost;

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">Shopping Cart ({cartItems.length} items)</h1>
        
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item._id} className="bg-white rounded-lg shadow p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <img
                  src={`https://broddie.menthealventures.com/${item.image}`}
                  alt={item.artname}
                  className="w-full sm:w-24 h-24 object-cover rounded"
                />
                <div className="flex-1 w-full">
                  <h3 className="font-semibold text-lg">{item.artname}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{item.desc}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-4">
                    <div className="flex items-center border rounded">
                      <button
                        onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                        className="px-3 py-1 hover:bg-gray-100"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 border-x min-w-[40px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                        className="px-3 py-1 hover:bg-gray-100"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-500 hover:text-red-700"
                      aria-label="Remove item"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <button 
            className="w-full mt-4 bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors disabled:bg-gray-400"
            disabled={!cartItems.length}
            onClick={() => setIsCheckoutModalOpen(true)}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>

      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
      />
    </div>
  );
};

export default Cart;
