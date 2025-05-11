import React, { useEffect, useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import CartItemDisplay from './cartItem';
import LoadingSpinner from '../common/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { createOrder as apiCreateOrder, checkoutOrder as apiCheckoutOrder } from '../../services/api';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShoppingBag, CreditCard } from "lucide-react";

interface CartPageProps {
  setCurrentPage: (page: 'products' | 'cart' | 'login' | 'orders') => void;
}

const CartPage: React.FC<CartPageProps> = ({ setCurrentPage }) => {
  const { cartItems, totalPrice, isLoading: isCartLoading, clearCart, fetchCart } = useCart();
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);

  useEffect(() => {
    console.log('Cart items:', cartItems);
    console.log('Is authenticated:', isAuthenticated);
    console.log('Is loading:', isAuthLoading, isCartLoading);
  }, [cartItems, isAuthenticated, isAuthLoading, isCartLoading]);

  const handleCreateOrderAndCheckout = async () => {
    if (cartItems.length === 0) {
      return;
    }
    setIsProcessingOrder(true);
    try {
      const cartItemIds = cartItems.map(item => item.id);

      const newOrder = await apiCreateOrder(cartItemIds);
      console.log({newOrder})
      const checkoutResponse = await apiCheckoutOrder(newOrder.id);      
      clearCart(); 
      await fetchCart();
      setCurrentPage('orders');

    } catch (error: any) {
      console.error('Order processing failed:', error);
    } finally {
      setIsProcessingOrder(false);
    }
  };

  if (isAuthLoading || (isAuthenticated && isCartLoading && cartItems.length === 0 && totalPrice === 0)) {
    return <LoadingSpinner className="mt-20" size={12} />;
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <Alert className="max-w-md mx-auto">
          <ShoppingBag className="h-4 w-4" />
          <AlertTitle>Login Required</AlertTitle>
          <AlertDescription>
            Please <Button variant="link" className="p-0 h-auto" onClick={() => setCurrentPage('login')}>log in</Button> to view your cart.
          </AlertDescription>
        </Alert>
      </div>
    );
  }
  
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
        <h1 className="text-2xl font-semibold mb-2">Your Cart is Empty</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Looks like you haven't added anything to your cart yet.</p>
        <Button onClick={() => setCurrentPage('products')}>Start Shopping</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">Your Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Cart Items ({cartItems.length})</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {isCartLoading && cartItems.length === 0 ? (
                <LoadingSpinner className="my-10" />
              ) : (
                cartItems.map(item => (
                  <CartItemDisplay key={item.id} item={item} />
                ))
              )}
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                <span className="font-semibold">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                <span className="font-semibold">Free</span>
              </div>
              <hr />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={handleCreateOrderAndCheckout}
                disabled={isProcessingOrder || isCartLoading}
              >
                {isProcessingOrder ? <LoadingSpinner size={5} className="mr-2" /> : <CreditCard className="mr-2 h-5 w-5" />}
                {isProcessingOrder ? 'Processing...' : 'Proceed to Checkout'}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CartPage;