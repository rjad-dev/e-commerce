import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, User as UserIcon, LogIn, LogOut, Package } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { Badge } from '@/components/ui/badge';

interface NavbarProps {
  setCurrentPage: (page: 'products' | 'cart' | 'login' | 'orders') => void;
}

const Navbar: React.FC<NavbarProps> = ({ setCurrentPage }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const { cartCount } = useCart();

  const handleLogout = () => {
    logout();
    setCurrentPage('products');
  };

  return (
    <nav className="bg-gray-100 dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button onClick={() => setCurrentPage('products')} className="flex-shrink-0 text-xl font-bold text-blue-600 dark:text-blue-400">
              eCommerce
            </button>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                <Button variant="ghost" onClick={() => setCurrentPage('products')}>Products</Button>
                {isAuthenticated && (
                  <Button variant="ghost" onClick={() => setCurrentPage('orders')}>
                    <Package className="mr-2 h-4 w-4" /> My Orders
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => setCurrentPage('cart')} className="relative">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <Badge variant="destructive" className="absolute -top-2 -right-2 rounded-full p-1 text-xs h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </Badge>
              )}
              <span className="sr-only">View Cart</span>
            </Button>
            {isAuthenticated ? (
              <>
                <span className="text-sm text-gray-700 dark:text-gray-300 hidden sm:inline">Hi, {user?.firstName}</span>
                <Button variant="outline" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </Button>
              </>
            ) : (
              <Button variant="outline" onClick={() => setCurrentPage('login')}>
                <LogIn className="mr-2 h-4 w-4" /> Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;