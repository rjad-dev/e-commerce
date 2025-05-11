import type { OrderStatusEnum } from "@/enums";

export interface Timestamp {
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface User extends Timestamp {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
}

export interface Product extends Timestamp {
  id: number;
  name: string;
  price: number;
  stockQuantity: number;
  imageUrl: string;
  description: string;
}

export interface LoginResponse {
  accessToken: string;
  user: User
}

export interface CartItems extends Timestamp {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
  expiryDate: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  product: Product
}

export interface OrderItems extends Timestamp {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  priceAtPurchase: number;
  product: Product;
}

export interface Order extends Timestamp {
  id: number;
  userId: number;
  status: OrderStatusEnum;
  totalAmount: number;
  orderItems: OrderItems[];
}

export interface ApiResponse {
  message: string;
  data: any
}
