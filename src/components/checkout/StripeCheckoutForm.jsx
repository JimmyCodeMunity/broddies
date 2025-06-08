import React, { useState, useContext } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';

const StripeCheckoutForm = ({ amount, cartItems, onSuccess }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { userdata } = useContext(AuthContext);
  const { clearCart } = useContext(CartContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    try {
      setIsProcessing(true);
      
      // Create PaymentIntent on the server
      const response = await fetch('http://localhost:5000/api/v1/stripe/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          currency: 'usd',
          userId: userdata?._id,
          cartItems
        }),
      });

      if (!response.ok) {
        throw new Error('Payment initialization failed');
      }

      const { paymentIntent, ephemeralKey, customer } = await response.json();

      // Confirm the payment
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-confirmation`,
          payment_method_data: {
            billing_details: {
              email: userdata?.email,
            },
          },
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      // If we get here, the payment was successful
      clearCart();
      onSuccess();
      toast.success('Payment successful!');
    } catch (error) {
      toast.error(error.message || 'Payment failed');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <div className="border rounded-lg p-4 bg-gray-50">
          <h4 className="font-medium mb-2">Order Summary</h4>
          <div className="space-y-2">
            {cartItems.map((item) => (
              <div key={item._id} className="flex justify-between text-sm">
                <span>{item.name} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-2 mt-2 font-medium">
              <div className="flex justify-between">
                <span>Total</span>
                <span>${amount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PaymentElement />

      <button
        type="submit"
        disabled={isProcessing || !stripe || !elements}
        className="w-full mt-4 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {isProcessing ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : (
          `Pay $${amount.toFixed(2)}`
        )}
      </button>
    </form>
  );
};

export default StripeCheckoutForm; 