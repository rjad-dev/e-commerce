import { OrderStatusEnum } from "../enums";
import { OrderInterface } from "../interfaces";
import Model from "../models";
import {
  CartItemRepository,
  OrderItemRepository,
  OrderRepository,
  ProductRepository,
} from "../repositories";
import { Op } from "sequelize";

export class OrdersService {
  private repository: OrderRepository;
  private cartItemRepository: CartItemRepository;
  private orderItemRepository: OrderItemRepository;
  private productRepository: ProductRepository;

  constructor() {
    this.repository = new OrderRepository();
    this.cartItemRepository = new CartItemRepository();
    this.productRepository = new ProductRepository();
    this.orderItemRepository = new OrderItemRepository();
  }

  async create({
    userId,
    cartItemIds,
  }: {
    userId: number;
    cartItemIds: number[];
  }): Promise<OrderInterface> {
    try {
      const cartItems = await this.cartItemRepository.findAll({
        where: { id: { [Op.in]: cartItemIds } },
      });

      if (cartItems.length !== cartItemIds.length) {
        throw new Error("One or more cart items not found");
      }

      const productIds = cartItems.map((item) => item.productId);

      const products = await this.productRepository.findAll({
        where: { id: { [Op.in]: productIds } },
      });

      const productMap = products.reduce((acc, product) => {
        acc[product.id] = product;
        return acc;
      }, {});
      let totalAmount = 0;
      const productsToUpdate = [];
      const outOfStockProducts = [];

      for (const cartItem of cartItems) {
        const product = productMap[cartItem.productId];

        if (!product || product.stockQuantity < cartItem.quantity) {
          outOfStockProducts.push(
            product?.name || `Product ID: ${cartItem.productId}`
          );
          continue;
        }

        productsToUpdate.push({
          id: product.id,
          stockQuantity: product.stockQuantity - cartItem.quantity,
        });

        totalAmount += product.price * cartItem.quantity;
      }

      if (outOfStockProducts.length > 0) {
        throw new Error(
          `The following products are out of stock: ${outOfStockProducts.join(
            ", "
          )}`
        );
      }

      for (const product of productsToUpdate) {
        await this.productRepository.updateOne({
          id: product.id,
          input: { stockQuantity: product.stockQuantity },
        });
      }

      const order = await this.repository.create({
        userId,
        totalAmount,
        status: OrderStatusEnum.PENDING,
      });

      const orderItems = cartItems.map((cartItem) => ({
        orderId: order.id,
        productId: cartItem.productId,
        quantity: cartItem.quantity,
        priceAtPurchase: productMap[cartItem.productId].price,
      }));

      await this.orderItemRepository.bulkCreate(orderItems);

      await this.cartItemRepository.deleteMany({
        where: { id: { [Op.in]: cartItemIds } },
      });

      return order;
    } catch (error) {
      console.error("Error in order creation:", error);
      throw error;
    }
  }

  async findAll({userId}: {userId: number}): Promise<OrderInterface[]> {
    return this.repository.findAll({
      where: {
        userId: userId
      },
      include: [
        {
          model: Model.OrderItem,
          as: 'orderItems',
          include: [
            {
              model: Model.Product,
              as: 'product'
            }
          ]
        }
      ]
    })
  }

  async checkout({ orderId }: { orderId: number }): Promise<OrderInterface> {
    const order = await this.repository.findByPk(orderId);
    if (order.status === OrderStatusEnum.COMPLETED) {
      throw new Error("The order has already been completed");
    }

    const updateOrder = await this.repository.updateOne({
      id: orderId,
      input: {
        status: OrderStatusEnum.COMPLETED,
      },
    });

    return this.repository.findByPk(orderId);
  }
}
