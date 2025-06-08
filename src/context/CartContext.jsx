import { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { toast } from 'react-toastify';

export const CartContext = createContext();

const STORAGE_PREFIX = 'art_cart_';

export const CartProvider = ({ children }) => {
  const { isUserAuthenticated, userdata } = useContext(AuthContext);
  const userId = userdata?._id;
  
  const [cartItems, setCartItems] = useState(() => {
    // Initialize cart from localStorage if we have a userId
    if (userId) {
      try {
        const savedCart = localStorage.getItem(`${STORAGE_PREFIX}${userId}`);
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
        if (userId) {
          const cartKey = `${STORAGE_PREFIX}${userId}`;
          const savedCart = localStorage.getItem(cartKey);
          
          if (savedCart) {
            try {
              const parsedCart = JSON.parse(savedCart);
              if (Array.isArray(parsedCart)) {
                setCartItems(parsedCart);
              } else {
                setCartItems([]);
              }
            } catch (error) {
              console.error('Error parsing cart data:', error);
              setCartItems([]);
            }
          } else {
            setCartItems([]);
          }
        } else {
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
  }, [userId]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    const saveCart = () => {
      if (userId && !isLoading) {
        try {
          const cartKey = `${STORAGE_PREFIX}${userId}`;
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
  }, [cartItems, userId, isLoading]);

  // Cleanup function to handle user logout
  useEffect(() => {
    if (!isUserAuthenticated) {
      setCartItems([]);
      setCartTotal(0);
    }
  }, [isUserAuthenticated]);

  const addToCart = (item) => {
    if (!isUserAuthenticated) {
      toast.error('Please login to add items to cart');
      return;
    }

    try {
      setCartItems(prevItems => {
        const existingItem = prevItems.find(i => i._id === item._id);
        
        if (existingItem) {
          const updatedItems = prevItems.map(i => 
            i._id === item._id 
              ? { ...i, quantity: i.quantity + 1 }
              : i
          );
          return updatedItems;
        }

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
      setCartItems(prevItems => {
        const updatedItems = prevItems.filter(item => item._id !== itemId);
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

      setCartItems(prevItems => {
        const updatedItems = prevItems.map(item =>
          item._id === itemId
            ? { ...item, quantity: newQuantity }
            : item
        );
        return updatedItems;
      });
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error('Failed to update quantity');
    }
  };

  const clearCart = () => {
    try {
      setCartItems([]);
      if (userId) {
        const cartKey = `${STORAGE_PREFIX}${userId}`;
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