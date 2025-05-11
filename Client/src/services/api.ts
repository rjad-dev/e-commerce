import axios from "axios";
import type { LoginResponse, CartItems, Product, Order, ApiResponse } from "../types";

const API_BASE_URL = "http://localhost:8000/ecommerce/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const loginUser = async (credentials: {
  username?: string;
  email?: string;
  password?: string;
}): Promise<ApiResponse> => {
  const response = await apiClient.post<ApiResponse>(
    "/users/login",
    credentials
  );
  return response.data;
};

export const getAllProducts = async (): Promise<Product[]> => {
  const response = await apiClient.get<ApiResponse>("/products");
  return response.data.data;
};

export const getCartItems = async (): Promise<CartItems[]> => {
  const response = await apiClient.get<ApiResponse>("/carts");
  return response.data.data;
};

export const addItemToCart = async (
  productId: number,
  quantity: number
): Promise<CartItems> => {
  const response = await apiClient.patch<CartItems>("/carts", {
    productId: productId,
    quantity,
  });
  return response.data;
};

export const removeItemFromCart = async (productId: number): Promise<void> => {
  await apiClient.delete("/carts", { data: { itemId: productId } });
};

export const createOrder = async (
  cartItemIds: number[]
): Promise<Order> => {
  const response = await apiClient.post<ApiResponse>("/orders", { 
    cartItemIds
  });

  return response.data.data;
};

export const getOrders = async (): Promise<Order[]> => {
  const response = await apiClient.get<ApiResponse>("/orders");
  console.log({response})
  const d = response.data.data
  console.log({d})
  return response.data.data;
};

export const checkoutOrder = async (
  orderId: number
): Promise<{ message: string; order: Order }> => {
  const response = await apiClient.patch<{ message: string; order: Order }>(
    `/orders/${orderId}/checkout`
  );
  return response.data;
};
