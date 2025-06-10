import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const PesapalCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(true);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const trackingId = searchParams.get('pesapal_transaction_tracking_id');
        const orderTrackingId = searchParams.get('pesapal_merchant_reference');
        const status = searchParams.get('pesapal_notification_type');

        if (!trackingId || !orderTrackingId) {
          toast.error('Invalid callback data');
          navigate('/cart');
          return;
        }

        // Send callback data to backend
        const response = await axios.get(
          'http://server.broddiescollection.com/api/v1/payments/pesapal/callback',
          { params: { OrderTrackingId: orderTrackingId, userId: trackingId, planId: status } }
        );

        if (response.data.success) {
          toast.success('Payment processed successfully');
          // Clear cart and redirect to success page
          navigate('/payment-success', { 
            state: { 
              orderId: orderTrackingId,
              paymentMethod: 'pesapal'
            }
          });
        } else {
          toast.error('Payment processing failed');
          navigate('/cart');
        }
      } catch (error) {
        console.error('Error processing callback:', error);
        toast.error('Error processing payment');
        navigate('/cart');
      } finally {
        setProcessing(false);
      }
    };

    handleCallback();
  }, [searchParams, navigate]);

  if (processing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Processing your payment...</p>
        </div>
      </div>
    );
  }

  return null;
};

export default PesapalCallback; 