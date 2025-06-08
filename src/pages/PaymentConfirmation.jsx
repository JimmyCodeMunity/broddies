import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const PaymentConfirmation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('processing');

  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        const paymentIntentId = searchParams.get('payment_intent');
        if (!paymentIntentId) {
          throw new Error('No payment intent ID found');
        }

        const response = await fetch('/api/checkout-complete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ paymentIntentId }),
        });

        const data = await response.json();

        if (data.success) {
          setStatus('success');
          toast.success('Payment completed successfully!');
        } else {
          setStatus('failed');
          toast.error(data.message || 'Payment failed');
        }
      } catch (error) {
        setStatus('failed');
        toast.error('Failed to verify payment status');
      }
    };

    checkPaymentStatus();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        {status === 'processing' && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <h2 className="mt-4 text-xl font-semibold">Processing Payment</h2>
            <p className="mt-2 text-gray-600">Please wait while we confirm your payment...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="mt-4 text-xl font-semibold text-green-600">Payment Successful!</h2>
            <p className="mt-2 text-gray-600">Thank you for your purchase.</p>
            <button
              onClick={() => navigate('/orders')}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              View Orders
            </button>
          </div>
        )}

        {status === 'failed' && (
          <div className="text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="mt-4 text-xl font-semibold text-red-600">Payment Failed</h2>
            <p className="mt-2 text-gray-600">Something went wrong with your payment.</p>
            <button
              onClick={() => navigate('/cart')}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Return to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentConfirmation; 