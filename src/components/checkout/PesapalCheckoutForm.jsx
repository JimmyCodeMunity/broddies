import axios from 'axios';
import React, { useEffect, useRef, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';

const PesapalCheckoutForm = ({ amount: initialAmount, cartItems, userId, onSuccess, onClose, onOpenModal }) => {
  const { userdata } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [paying, setPaying] = useState(false);
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [code, setCode] = useState(null);
  const [paymentacc, setPaymentacc] = useState(null);
  const [method, setMethod] = useState(null);
  const intervalRef = useRef(null);
  const [orderTrackingId, setOrderTrackingId] = useState("");
  const [paymentComplete, setPaymentComplete] = useState(false);

  const resetPaymentState = () => {
    setOrderTrackingId("");
    setPaymentComplete(false);
    setPaying(false);
    setLoading(false);
    setUrl("");
    setPaymentAmount(0);
    setCode(null);
    setPaymentacc(null);
    setMethod(null);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const requestPayment = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        'https://server.broddiescollection.com/api/v1/payments/pesapal/requestpayment',
        {
          amount: initialAmount,
          userId,
          email: userdata?.email,
          cartItems,
        }
      );
      const data = response.data;
      console.log("response", data);
      setLoading(false);

      if (data.status === "200") {
        setPaying(true);
        const redirect = data.redirect_url;
        setUrl(redirect);
        // console.log("redirect",redirect)
        setOpen(true);
        console.log("order", data.order_tracking_id);
        const orderTrackingId = data.order_tracking_id;
        setOrderTrackingId(orderTrackingId);
        
        // Start polling every 3 seconds
        intervalRef.current = setInterval(() => {
          console.log("checking now...");
          // checkStatus(orderTrackingId);
        }, 3000);

        if (onOpenModal) {
          onOpenModal(redirect, orderTrackingId);
        }
      } else {
        toast.error('Failed to initiate Pesapal payment');
      }
    } catch (error) {
      console.log("error requesting payment", error);
      setLoading(false);
      toast.error('Error requesting Pesapal payment');
    }
  };

  const closeModal = () => {
    resetPaymentState();
    setOpen(false);
    if (onClose) {
      onClose();
    }
  };

  // const checkStatus = async (orderTrackingId) => {
  //   console.log("checking", orderTrackingId);
  //   try {
  //     const response = await axios.post(
  //       "https://server.broddiescollection.com/api/v1/payments/pesapal/checkpayment",
  //       { orderTrackingId }
  //     );
  //     const data = response.data;
  //     console.log("transaction state", data.status_code);

  //     if (data.status_code === 1) {
  //       clearInterval(intervalRef.current);
  //       setPaymentComplete(true);
  //       setPaying(false);
  //       setOpen(false);
  //       setPaymentAmount(data.amount);
  //       setCode(data.confirmation_code);
  //       setPaymentacc(data.payment_account);
  //       setMethod(data.payment_method);
  //       toast.success("Payment completed successfully");
  //       if (onSuccess) {
  //         onSuccess();
  //       }
  //     }
  //   } catch (error) {
  //     console.log("error checking", error);
  //     clearInterval(intervalRef.current);
  //     setPaying(false);
  //     toast.error('Error checking payment status');
  //   }
  // };

  useEffect(() => {
    return () => {
      resetPaymentState();
    };
  }, []);

  return (
    <div>
      {paymentComplete ? (
        <div className='w-full flex flex-col space-y-5 justify-center items-center'>
          <h1 className="text-green-500">Payment Completed Successfully</h1>
          <div className="w-full bg-neutral-100 shadow-sm rounded-xl py-5 px-5 space-y-3">
            <h1 className='text-neutral-500 font-semibold text-xl'>Payment Details</h1>
            <div className="w-full flex justify-between flex-row items-center">
              <div><p className="text-xl text-black">Amount</p></div>
              <div><p className="text-xl text-black">..........</p></div>
              <div><p className="text-xl text-black">${paymentAmount}</p></div>
            </div>
            <div className="w-full flex justify-between flex-row items-center">
              <div><p className="text-xl text-black">Payment Account</p></div>
              <div><p className="text-xl text-black">..........</p></div>
              <div><p className="text-xl text-black">{paymentacc}</p></div>
            </div>
            <div className="w-full flex justify-between flex-row items-center">
              <div><p className="text-xl text-black">Transaction Code</p></div>
              <div><p className="text-xl text-black">..........</p></div>
              <div><p className="text-xl text-black">{code}</p></div>
            </div>
            <div className="w-full">
              <button onClick={closeModal} className="w-full flex-row items-center flex justify-center h-12 bg-green-500 rounded-xl text-white">Continue</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col space-y-5 justify-center items-center">
          <h1 className="text-neutral-500">Complete payment</h1>
          {loading && (
            <div className="flex items-center justify-center">
              <span className="animate-spin h-8 w-8 border-b-2 border-orange-500 rounded-full"></span>
            </div>
          )}
          {paying ? (
            <button className='bg-orange-500 h-12 w-60 rounded-xl text-white flex flex-row items-center justify-center'>
              Processing...
            </button>
          ) : (
            <button 
              onClick={requestPayment} 
              className='bg-orange-500 h-12 w-60 rounded-xl text-white hover:bg-orange-600 transition-colors'
            >
              Complete payment
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default PesapalCheckoutForm; 