import { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { toast } from 'react-toastify';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { isUserAuthenticated, userdata } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  // Load cart from localStorage on mount and when auth state changes
  useEffect(() => {
    const loadCart = () => {
      if (isUserAuthenticated && userdata) {
        const savedCart = localStorage.getItem(`cart_${userdata._id}`);
        if (savedCart) {
          setCartItems(JSON.parse(savedCart));
        }
      } else {
        setCartItems([]);
      }
    };

    loadCart();
  }, [isUserAuthenticated, userdata]);

  // Update cart total whenever items change
  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setCartTotal(total);
    
    // Save to localStorage if user is authenticated
    if (isUserAuthenticated && userdata) {
      localStorage.setItem(`cart_${userdata._id}`, JSON.stringify(cartItems));
    }
  }, [cartItems, isUserAuthenticated, userdata]);

  const addToCart = (item) => {
    if (!isUserAuthenticated) {
      toast.error('Please login to add items to cart');
      return;
    }

    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i._id === item._id);
      
      if (existingItem) {
        return prevItems.map(i => 
          i._id === item._id 
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      return [...prevItems, { ...item, quantity: 1 }];
    });

    toast.success('Item added to cart');
  };

  const removeFromCart = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item._id !== itemId));
    toast.success('Item removed from cart');
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item._id === itemId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    if (isUserAuthenticated && userdata) {
      localStorage.removeItem(`cart_${userdata._id}`);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}; 