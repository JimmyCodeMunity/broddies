import { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { toast } from 'react-toastify';

export const CartContext = createContext();

const STORAGE_PREFIX = 'art_cart_';

export const CartProvider = ({ children }) => {
  const { isUserAuthenticated, userdata } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState(() => {
    // Initialize cart from localStorage if user is already authenticated
    if (userdata?._id) {
      try {
        const savedCart = localStorage.getItem(`${STORAGE_PREFIX}${userdata._id}`);
        return savedCart ? JSON.parse(savedCart) : [];
      } catch (error) {
        console.error('Error loading initial cart:', error);
        return [];
      }
    }
    return [];
  });
  const [cartTotal, setCartTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart when authentication state changes
  useEffect(() => {
    const loadCart = async () => {
      try {
        setIsLoading(true);
        if (isUserAuthenticated && userdata?._id) {
          const cartKey = `${STORAGE_PREFIX}${userdata._id}`;
          console.log('Loading cart for user:', userdata._id);
          const savedCart = localStorage.getItem(cartKey);
          console.log('Saved cart from localStorage:', savedCart);
          
          if (savedCart) {
            try {
              const parsedCart = JSON.parse(savedCart);
              if (Array.isArray(parsedCart)) {
                setCartItems(parsedCart);
                console.log('Successfully loaded cart:', parsedCart);
              } else {
                console.error('Invalid cart data format');
                setCartItems([]);
              }
            } catch (error) {
              console.error('Error parsing cart data:', error);
              setCartItems([]);
            }
          } else {
            // If no saved cart exists for user, initialize empty cart
            setCartItems([]);
          }
        } else {
          // Clear cart when logged out
          setCartItems([]);
        }
      } catch (error) {
        console.error('Error in loadCart:', error);
        setCartItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadCart();
  }, [isUserAuthenticated, userdata]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    const saveCart = () => {
      if (isUserAuthenticated && userdata?._id && !isLoading) {
        try {
          const cartKey = `${STORAGE_PREFIX}${userdata._id}`;
          console.log('Saving cart to localStorage:', cartItems);
          localStorage.setItem(cartKey, JSON.stringify(cartItems));
          
          // Update cart total
          const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
          setCartTotal(total);
        } catch (error) {
          console.error('Error saving cart:', error);
          toast.error('Failed to save cart changes');
        }
      }
    };

    saveCart();
  }, [cartItems, isUserAuthenticated, userdata, isLoading]);

  // Cleanup function to handle user logout
  useEffect(() => {
    if (!isUserAuthenticated) {
      // Clear current user's cart from memory
      setCartItems([]);
      setCartTotal(0);
    }
  }, [isUserAuthenticated]);

  const addToCart = (item) => {
    if (!isUserAuthenticated) {
      toast.error('Please login to add items to cart');
      return;
    }

    if (!userdata?._id) {
      toast.error('User data not loaded properly');
      return;
    }

    try {
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
        return [...prevItems, { ...item, quantity: 1 }];
      });

      toast.success('Item added to cart');
    } catch (error) {
      console.error('Error adding item to cart:', error);
      toast.error('Failed to add item to cart');
    }
  };

  const removeFromCart = (itemId) => {
    try {
      console.log('Removing item from cart:', itemId);
      setCartItems(prevItems => {
        const updatedItems = prevItems.filter(item => item._id !== itemId);
        console.log('Updated cart after removal:', updatedItems);
        return updatedItems;
      });
      toast.success('Item removed from cart');
    } catch (error) {
      console.error('Error removing item from cart:', error);
      toast.error('Failed to remove item from cart');
    }
  };

  const updateQuantity = (itemId, newQuantity) => {
    try {
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
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error('Failed to update quantity');
    }
  };

  const clearCart = () => {
    try {
      console.log('Clearing cart');
      setCartItems([]);
      if (isUserAuthenticated && userdata?._id) {
        const cartKey = `${STORAGE_PREFIX}${userdata._id}`;
        localStorage.removeItem(cartKey);
      }
      toast.success('Cart cleared');
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Failed to clear cart');
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
        clearCart,
        isLoading
      }}
    >
      {children}
    </CartContext.Provider>
  );
}; 