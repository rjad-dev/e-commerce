import React, { createContext, useState, useEffect, useContext } from 'react';
import type { ReactNode } from 'react';
import type { CartItems, Product } from '../types';
import { getCartItems as apiGetCartItems, addItemToCart as apiAddItemToCart, removeItemFromCart as apiRemoveItemFromCart} from '../services/api';
import { useAuth } from './AuthContext';


interface CartContextType {
  cartItems: CartItems[];
  addToCart: (product: Product, quantity?: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  updateQuantity: (productId: number, quantity: number) => Promise<void>;
  clearCart: () => void;
  isLoading: boolean;
  cartCount: number;
  fetchCart: () => Promise<void>;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItems[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isAuthenticated, token } = useAuth();

  const fetchCart = async () => {
    if (!isAuthenticated || !token) {
      setCartItems([]);
      return;
    }
    setIsLoading(true);
    try {
      const items = await apiGetCartItems();
      setCartItems(items || []);
    } catch (error) {
      console.error('Failed to fetch cart items:', error);
      setCartItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [isAuthenticated, token]);

  const addToCart = async (product: Product, quantity: number = 1) => {
    if (!isAuthenticated) {
      return;
    }
    setIsLoading(true);
    try {
      await apiAddItemToCart(product.id, quantity);
      await fetchCart();
    } catch (error: any) {
      console.error('Failed to add item to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (productId: number) => {
    if (!isAuthenticated) return;
    setIsLoading(true);
    try {
      await apiRemoveItemFromCart(productId);
      await fetchCart();
    } catch (error: any) {
      console.error('Failed to remove item from cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (productId: number, quantity: number) => {
    if (!isAuthenticated) return;
    if (quantity <= 0) {
      await removeFromCart(productId);
      return;
    }
    setIsLoading(true)
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);


  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, isLoading, cartCount, fetchCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};