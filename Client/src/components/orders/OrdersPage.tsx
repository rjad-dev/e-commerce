import React, { useEffect, useState } from "react";
import { getOrders as apiGetOrders } from "../../services/api";
import type { Order } from "@/types";
import LoadingSpinner from "../common/LoadingSpinner";
import { useAuth } from "../../contexts/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PackageSearch, ListOrdered } from "lucide-react";
import { Button } from "../ui/button";
import { OrderStatusEnum } from "@/enums";

interface OrdersPageProps {
  setCurrentPage: (page: "products" | "cart" | "login" | "orders") => void;
}

const OrdersPage: React.FC<OrdersPageProps> = ({ setCurrentPage }) => {
  const [orders, setOrders] = useState<Order[]>([]);  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      setIsLoading(false);
      return;
    }

    const fetchOrders = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const fetchedOrders = await apiGetOrders();
        setOrders(
          fetchedOrders
        );
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError("Could not load your orders. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated]);

  if (isAuthLoading) {
    return <LoadingSpinner className="mt-20" size={12} />;
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <Alert className="max-w-md mx-auto">
          <ListOrdered className="h-4 w-4" />
          <AlertTitle>Login Required</AlertTitle>
          <AlertDescription>
            Please{" "}
            <Button
              variant="link"
              className="p-0 h-auto"
              onClick={() => setCurrentPage("login")}
            >
              log in
            </Button>{" "}
            to view your orders.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (isLoading) {
    return <LoadingSpinner className="mt-20" size={12} />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive" className="max-w-md mx-auto">
          <PackageSearch className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  console.log(orders)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
        My Orders
      </h1>
      {orders.length === 0 ? (
        <div className="text-center py-10">
          <PackageSearch className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <p className="text-xl text-gray-600 dark:text-gray-400">
            You haven't placed any orders yet.
          </p>
          <Button onClick={() => setCurrentPage("products")} className="mt-6">
            Shop Now
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id} className="shadow-lg">
              <CardHeader className="flex flex-row justify-between items-center">
                <div>
                  <CardTitle>Order #{order.id}</CardTitle>
                  <CardDescription>
                    Placed on: {new Date(order.createdAt).toLocaleDateString()}
                  </CardDescription>
                </div>
                <Badge
                  variant={
                    order.status === OrderStatusEnum.COMPLETED
                      ? "default"
                      : order.status === OrderStatusEnum.PENDING
                      ? "secondary"
                      : "outline"
                  }
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </CardHeader>
              <CardContent>
                <h4 className="font-semibold mb-2">Items:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                  {order.orderItems.map((item) => (
                    <li key={item.productId}>
                      Product ID: {item.productId} - Quantity: {item.quantity} -
                      Price: ${item.product.price}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="text-right">
                <p className="text-lg font-semibold">
                  Total: ${order.totalAmount}
                </p>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
