import React, { useState, useContext } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';
import PaymentMethodCard from './PaymentMethodCard';
import StripeCheckoutForm from './StripeCheckoutForm';

// Replace with your Stripe publishable key
const stripePromise = loadStripe('pk_test_51Oc4wRJE5eZbfcv0cFDOguSg9YFS8Bswru6JaXimoGk6NbBuBy2fUi8CKTjsaHPV7dlS1cTXJrd2mmPfrJg8WjEo00fuiP5l84');

const CheckoutModal = ({ isOpen, onClose }) => {
  const [selectedMethod, setSelectedMethod] = useState('stripe');
  const { cartTotal, cartItems } = useContext(CartContext);

  const paymentMethods = [
    {
      id: 'stripe',
      name: 'Credit Card',
      description: 'Pay securely with your credit card',
      active: true
    },
    {
      id: 'paypal',
      name: 'PayPal',
      description: 'Pay with your PayPal account (Coming Soon)',
      active: false
    }
  ];

  const handleSuccess = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <span className="sr-only">Close</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Checkout
                </h3>
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <PaymentMethodCard
                      key={method.id}
                      method={method}
                      selected={selectedMethod === method.id}
                      onSelect={method.active ? setSelectedMethod : () => toast.info('Coming soon!')}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 px-4 py-3">
            {selectedMethod === 'stripe' ? (
              <Elements stripe={stripePromise}>
                <StripeCheckoutForm 
                  amount={cartTotal} 
                  cartItems={cartItems}
                  onSuccess={handleSuccess} 
                />
              </Elements>
            ) : (
              <div className="text-center text-gray-500 py-4">
                PayPal integration coming soon...
              </div>
            )}
          </div>

          <div className="px-4 py-3 bg-gray-50 border-t">
            <div className="flex items-center justify-center text-sm text-gray-500">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Secure payment powered by Stripe
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal; 