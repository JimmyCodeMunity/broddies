import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProductView from "./pages/ProductView";
import AllArtPage from "./pages/AllArtPage";
import CartPage from "./pages/CartPage";
import RegisterPage from "./pages/RegisterPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoutes from "./context/ProtectedRoutes";
import { CartProvider } from "./context/CartContext";
import { ApiProvider } from "./context/ApiContext";
import PaymentConfirmation from './pages/PaymentConfirmation';
import PesapalCallback from './components/checkout/PesapalCallback';

function App() {
  return (
    <ApiProvider>
      <CartProvider>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/artview/:id" index element={<ProductView />} />
            <Route path="/view-all-art" index element={<AllArtPage />} />
            <Route path="/cart" index element={<CartPage />} />
          </Route>
          <Route path="/" index element={<HomePage />} />
          <Route path="/login" index element={<LoginPage />} />
          <Route path="/register" index element={<RegisterPage />} />
          <Route path="/payment-confirmation" element={<PaymentConfirmation />} />
          <Route path="/pesapal-callback" element={<PesapalCallback />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </CartProvider>
    </ApiProvider>
  );
}

export default App;
