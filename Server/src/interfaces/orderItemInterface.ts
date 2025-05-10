import * as Sequelize from "sequelize";
import { ModelTimestampExtend } from "./modelInterface";

export interface InputOrderItemsInterface {
  orderId: number;
  productId: number;
  quantity: number;
  priceAtPurchase: number;
}

export interface OrderItemsInterface
  extends InputOrderItemsInterface,
    ModelTimestampExtend {
  id: number;
}

export interface OrderItemsModelInterface
  extends Sequelize.Model<OrderItemsInterface, Partial<InputOrderItemsInterface>>,
    OrderItemsInterface {}
