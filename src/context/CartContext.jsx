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
        const cartKey = `cart_${userdata._id}`;
        console.log('Loading cart for user:', userdata._id);
        const savedCart = localStorage.getItem(cartKey);
        console.log('Saved cart from localStorage:', savedCart);
        if (savedCart) {
          try {
            const parsedCart = JSON.parse(savedCart);
            setCartItems(parsedCart);
            console.log('Successfully loaded cart:', parsedCart);
          } catch (error) {
            console.error('Error parsing cart from localStorage:', error);
            localStorage.removeItem(cartKey); // Clear invalid data
            setCartItems([]);
          }
        }
      } else {
        console.log('No authenticated user, clearing cart');
        setCartItems([]);
      }
    };

    loadCart();
  }, [isUserAuthenticated, userdata]);

  // Update cart total and save to localStorage whenever items change
  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setCartTotal(total);
    
    // Save to localStorage if user is authenticated
    if (isUserAuthenticated && userdata) {
      const cartKey = `cart_${userdata._id}`;
      console.log('Saving cart to localStorage:', cartItems);
      localStorage.setItem(cartKey, JSON.stringify(cartItems));
    }
  }, [cartItems, isUserAuthenticated, userdata]);

  const addToCart = (item) => {
    if (!isUserAuthenticated) {
      toast.error('Please login to add items to cart');
      return;
    }

    console.log('Adding item to cart:', item);
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i._id === item._id);
      
      if (existingItem) {
        console.log('Item already exists, updating quantity');
        const updatedItems = prevItems.map(i => 
          i._id === item._id 
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
        return updatedItems;
      }

      console.log('Adding new item to cart');
      const newItems = [...prevItems, { ...item, quantity: 1 }];
      return newItems;
    });

    toast.success('Item added to cart');
  };

  const removeFromCart = (itemId) => {
    console.log('Removing item from cart:', itemId);
    setCartItems(prevItems => {
      const updatedItems = prevItems.filter(item => item._id !== itemId);
      console.log('Updated cart after removal:', updatedItems);
      return updatedItems;
    });
    toast.success('Item removed from cart');
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
      return;
    }

    console.log('Updating quantity:', itemId, newQuantity);
    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item =>
        item._id === itemId
          ? { ...item, quantity: newQuantity }
          : item
      );
      console.log('Updated cart after quantity change:', updatedItems);
      return updatedItems;
    });
  };

  const clearCart = () => {
    console.log('Clearing cart');
    setCartItems([]);
    if (isUserAuthenticated && userdata) {
      const cartKey = `cart_${userdata._id}`;
      localStorage.removeItem(cartKey);
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