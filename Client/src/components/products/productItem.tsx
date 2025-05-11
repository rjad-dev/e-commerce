import React from 'react';
import type { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCartIcon } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

interface ProductItemProps {
  product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const { addToCart, isLoading: isCartLoading } = useCart();

  const handleAddToCart = () => {
    addToCart(product, 1);
  };
  
  const placeholderImage = `https://placehold.co/600x400/E2E8F0/4A5568?text=${encodeURIComponent(product.name)}`;


  return (
    <Card className="w-full flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0">
        <img
          src={product.imageUrl || placeholderImage}
          alt={product.name}
          className="w-full h-48 object-cover"
          onError={(e) => (e.currentTarget.src = placeholderImage)}
        />
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-semibold mb-1 truncate" title={product.name}>{product.name}</CardTitle>
        <CardDescription className="text-sm text-gray-600 dark:text-gray-400 mb-2 h-10 overflow-hidden">
          {product.description || "No description available."}
        </CardDescription>
        <div className="flex justify-between items-center mb-3">
          <Badge variant={product.stockQuantity > 0 ? 'default' : 'destructive'}>
            {product.stockQuantity}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <Button 
          onClick={handleAddToCart} 
          disabled={isCartLoading || product.stockQuantity <= 0}
          className="w-full"
        >
          <ShoppingCartIcon className="mr-2 h-4 w-4" />
          {product.stockQuantity > 0 ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductItem;