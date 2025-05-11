import React, { useEffect, useState } from 'react';
import type { Product } from '@/types';
import { getAllProducts } from '../../services/api';
import ProductItem from './productItem';
import LoadingSpinner from '../common/LoadingSpinner';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";


const ProductListPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getAllProducts();
        console.log(data)
        const productsWithDetails = data.map(p => ({
            ...p,
            image_url: p.imageUrl || `https://placehold.co/300x200/E0E0E0/757575?text=${encodeURIComponent(p.name)}`,
            description: p.description || `A brief description of ${p.name}. High quality and durable.`,
            stock_status: p.stockQuantity || (Math.random() > 0.2 ? 'In Stock' : 'Out of Stock')
        }));
        setProducts(productsWithDetails);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <LoadingSpinner className="mt-20" size={12} />;
  }

  if (error) {
    return (
        <div className="container mx-auto px-4 py-8">
            <Alert variant="destructive" className="max-w-md mx-auto">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
        </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">Our Products</h1>
      <div className="mb-8 max-w-md mx-auto">
        <Input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      {filteredProducts.length === 0 && !isLoading && (
        <p className="text-center text-gray-600 dark:text-gray-400">No products found matching your search.</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductListPage;