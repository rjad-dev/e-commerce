import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Navbar from './components/navbar';
import ProductListPage from './components/products/ProductListPage';
import CartPage from './components/carts/cartPage';
import LoginPage from './components/auth/LoginPage';
import OrdersPage from './components/orders/OrdersPage'; // Bonus
import { Toaster } from 'sonner';

// Define the possible pages
type Page = 'products' | 'cart' | 'login' | 'orders';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('products');

  const renderPage = () => {
    switch (currentPage) {
      case 'products':
        return <ProductListPage />;
      case 'cart':
        return <CartPage setCurrentPage={setCurrentPage} />;
      case 'login':
        return <LoginPage setCurrentPage={setCurrentPage} />;
      case 'orders':
        return <OrdersPage setCurrentPage={setCurrentPage} />; // Bonus
      default:
        return <ProductListPage />;
    }
  };

  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
          <Navbar setCurrentPage={setCurrentPage} />
          <main className="flex-grow">
            {/* If using react-router-dom, you'd have <Routes> here */}
            {renderPage()}
          </main>
          <footer className="bg-gray-100 dark:bg-gray-800 text-center p-4 text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} eCommerce. All rights reserved.
          </footer>
        </div>
        <Toaster /> {/* For shadcn/ui default toasts */}
        <Toaster richColors position="top-right" /> {/* For shadcn/ui sonner toasts */}
      </CartProvider>
    </AuthProvider>
  );
}

export default App;