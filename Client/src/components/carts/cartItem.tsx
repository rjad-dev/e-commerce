import React from "react";
import type { CartItems as CartItemType } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "../../contexts/CartContext";

interface CartItemProps {
  item: CartItemType;
}

const CartItemDisplay: React.FC<CartItemProps> = ({ item }) => {
  const {
    removeFromCart,
    updateQuantity,
    isLoading: isCartLoading,
  } = useCart();

  const placeholderImage = `https://placehold.co/100x100/E2E8F0/4A5568?text=${encodeURIComponent(
    item.product.name
  )}`;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) {
      updateQuantity(item.id, 1);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-4">
        <img
          src={item.product.imageUrl || placeholderImage}
          alt={item.product.name}
          className="w-16 h-16 object-cover rounded"
          onError={(e) => (e.currentTarget.src = placeholderImage)}
        />
        <div>
          <h3 className="text-md font-semibold text-gray-800 dark:text-gray-100">
            {item.product.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Price: ${item.product.price}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <Button
          size="icon"
          variant="outline"
          onClick={() => handleQuantityChange(item.quantity - 1)}
          disabled={isCartLoading || item.quantity <= 1}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Input
          type="number"
          value={item.quantity}
          onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
          className="w-16 text-center"
          min="1"
          disabled={isCartLoading}
        />
        <Button
          size="icon"
          variant="outline"
          onClick={() => handleQuantityChange(item.quantity + 1)}
          disabled={isCartLoading}
        >
          <Plus className="h-4 w-4" />
        </Button>
        <Button
          variant="destructive"
          size="icon"
          onClick={() => removeFromCart(item.id)}
          disabled={isCartLoading}
          aria-label="Remove item"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CartItemDisplay;
