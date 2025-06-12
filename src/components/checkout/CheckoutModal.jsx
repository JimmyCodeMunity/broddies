import React, { useState, useContext, useRef, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
import PaymentMethodCard from "./PaymentMethodCard";
import StripeCheckoutForm from "./StripeCheckoutForm";
import PesapalCheckoutForm from "./PesapalCheckoutForm";
import PesapalModal from "./PesapalModal";
import axios from "axios";

// Replace with your Stripe publishable key
const stripePromise = loadStripe(
  "pk_test_51Oc4wRJE5eZbfcv0ZZg8sqwprkiBtm3lOAHIcRIkKFEUEAfmKa0F4uNIDc936uUwpxC6X8zIdE5TcUmoY58PFP2f00RLpIZc54"
);

const CheckoutModal = ({ isOpen, onClose }) => {
  const [selectedMethod, setSelectedMethod] = useState("stripe");
  const { cartTotal, cartItems } = useContext(CartContext);
  const { userdata } = useContext(AuthContext);
  const [clientSecret, setClientSecret] = useState("");
  const [pesapalModalOpen, setPesapalModalOpen] = useState(false);
  const [pesapalUrl, setPesapalUrl] = useState("");
  const [pesapalOrderId, setPesapalOrderId] = useState("");
  const [paying, setPaying] = useState(false);

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");

  const [amount, setAmount] = useState(0);
  const [code, setCode] = useState(null);
  const [paymentacc, setPaymentacc] = useState(null);
  const [method, setMethod] = useState(null);
  const [pesastart, setPesastart] = useState(false);

  const intervalRef = useRef(null);
  const [orderTrackingId, setOrderTrackingId] = useState("");
  const [paymentComplete, setPaymentComplete] = useState(false);

  const [stripeLoading, setStripeLoading] = useState(false);

  const requestStripePayment = async () => {
    if (selectedMethod !== "stripe") return;
    const serverurl = "https://server.broddiescollection.com";

    setStripeLoading(true);
    try {
      // Create condensed cart data with only essential information
      const condensedCartItems = cartItems.map((item) => ({
        _id: item._id,
        quantity: item.quantity,
        price: parseFloat(item.price),
      }));

      const response = await fetch(
        `https://server.broddiescollection.com/api/v1/stripe/create-payment-intent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: cartTotal,
            currency: "usd",
            userId: userdata?._id,
            cartItems: condensedCartItems,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create payment intent");
      }

      const data = await response.json();
      setClientSecret(data.paymentIntent);
    } catch (error) {
      console.error("Payment initialization failed:", error);
      toast.error("Failed to initialize payment");
    } finally {
      setStripeLoading(false);
    }
  };

  const requestPayment = async () => {
    if (selectedMethod !== "pesapal") return;

    setLoading(true);
    setPesastart(true);
    try {
      const response = await axios.post(
        `https://server.broddiescollection.com/api/v1/payments/pesapal/requestpayment`,
        {
          amount: cartTotal,
          userId: userdata?._id,
          email: userdata?.email,
          cartItems: cartItems,
        }
      );
      const data = response.data;
      console.log("response", data);
      setLoading(false);

      if (data.status == "200") {
        setPaying(true);
        setPesastart(false);
        const redirect = data.redirect_url;
        setUrl(redirect);
        setOpen(true);
        console.log("order", data.order_tracking_id);
        const orderTrackingId = data.order_tracking_id;
        // Start polling every 3 seconds
        intervalRef.current = setInterval(() => {
          console.log("checking now...");
          checkStatus(orderTrackingId);
        }, 3000);
        console.log("payment request made");
      }
    } catch (error) {
      setPesastart(false);
      console.log("error requesting payment", error);
    }
  };

  const closeModal = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setOpen(false);
    setPaying(false);
    setLoading(false);
    setUrl("");
  };

  const checkStatus = async (orderTrackingId) => {
    console.log("checking", orderTrackingId);
    try {
      const response = await axios.post(
        `https://server.broddiescollection.com/api/v1/payments/pesapal/checkpayment`,
        { orderTrackingId, cartItems, userId: userdata?._id }
      );
      const data = response.data;
      console.log("call", data.pesapalStatus.status_code);
      console.log("transaction state", data.status_code);
      // return

      // Example: assume data.status becomes "COMPLETED" when payment is done
      if (data.pesapalStatus.status_code === 1) {
        clearInterval(intervalRef.current);
        setPaymentComplete(true);
        setPaying(false);
        setOpen(false);
        setAmount(data.amount);
        setCode(data.confirmation_code);
        setPaymentacc(data.payment_account);
        setMethod(data.payment_method);
        toast.success("Payment completed successfully");
        onClose(); // Close the checkout modal when payment succeeds
      }
    } catch (error) {
      console.log("error checking", error);
      setPesastart(false);
      clearInterval(intervalRef.current);
      setPaying(false);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const paymentMethods = [
    {
      id: "stripe",
      name: "Credit Card",
      description: "Pay securely with your credit card",
      active: true,
    },
    {
      id: "pesapal",
      name: "Pesapal",
      description: "Pay with Pesapal (Mobile Money, Card, etc)",
      active: true,
    },
    {
      id: "paypal",
      name: "PayPal",
      description: "Pay with your PayPal account (Coming Soon)",
      active: false,
    },
  ];

  const handleSuccess = () => {
    onClose();
  };

  const handlePesapalModalOpen = (url, orderId) => {
    setPesapalUrl(url);
    setPesapalOrderId(orderId);
    setPesapalModalOpen(true);
  };

  if (!isOpen) return null;

  const options = {
    clientSecret,
    appearance: {
      theme: "stripe",
      variables: {
        colorPrimary: "#0570de",
        colorBackground: "#ffffff",
        colorText: "#30313d",
        colorDanger: "#df1b41",
        fontFamily: "Ideal Sans, system-ui, sans-serif",
        spacingUnit: "2px",
        borderRadius: "4px",
      },
    },
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
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
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
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
                      onSelect={
                        method.active
                          ? () => {
                              setSelectedMethod(method.id);
                              setClientSecret(""); // Reset client secret when switching methods
                            }
                          : () => toast.info("Coming soon!")
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 px-4 py-3">
            {selectedMethod === "stripe" ? (
              clientSecret ? (
                <Elements stripe={stripePromise} options={options}>
                  <StripeCheckoutForm
                    amount={cartTotal}
                    cartItems={cartItems}
                    onSuccess={handleSuccess}
                  />
                </Elements>
              ) : (
                <div className="w-full py-4 flex flex-row justify-center items-center">
                  {stripeLoading ? (
                    <button
                      disabled
                      className="bg-blue-500 h-12 w-60 rounded-xl text-white flex flex-row items-center justify-center"
                    >
                      <div className="flex items-center justify-center">
                        <span className="animate-spin h-8 w-8 border-b-2 border-white rounded-full"></span>
                      </div>
                    </button>
                  ) : (
                    <button
                      onClick={requestStripePayment}
                      className="bg-blue-500 h-12 w-60 rounded-xl text-white hover:bg-blue-600 transition-colors"
                    >
                      Initialize Payment
                    </button>
                  )}
                </div>
              )
            ) : selectedMethod === "pesapal" ? (
              <div className="w-full py-4 flex flex-row justify-center items-center">
                {pesastart ? (
                  <button
                    disabled
                    className="bg-green-500 h-12 w-60 rounded-xl text-white flex flex-row items-center justify-center"
                  >
                    <div className="flex items-center justify-center">
                      <span className="animate-spin h-8 w-8 border-b-2 border-white rounded-full"></span>
                    </div>
                  </button>
                ) : (
                  <button
                    onClick={() => requestPayment()}
                    className="bg-green-500 h-12 w-60 rounded-xl text-white"
                  >
                    Complete payment
                  </button>
                )}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-4">
                PayPal integration coming soon...
              </div>
            )}
          </div>

          <div className="px-4 py-3 bg-gray-50 border-t">
            <div className="flex items-center justify-center text-sm text-gray-500">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              Secure payment
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        {open && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start p-10 z-50 overflow-hidden">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl h-[90vh] overflow-hidden p-5 relative">
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 text-red-600 font-bold text-xl"
              >
                &times;
              </button>

              <iframe
                src={url}
                className="w-full h-full rounded-b-xl border-none"
                title="Mini Browser"
              />
            </div>
          </div>
        )}
      </div>

      <PesapalModal
        open={pesapalModalOpen}
        url={pesapalUrl}
        onClose={() => setPesapalModalOpen(false)}
      />
    </div>
  );
};

export default CheckoutModal;
