import * as Sequelize from "sequelize";
import { ModelTimestampExtend } from "./modelInterface";

export interface InputCartItemInterface {
  cartId: number;
  productId: number;
  quantity: number;
  expiryDate: Date;
}

export interface CartItemInterface
  extends InputCartItemInterface,
    ModelTimestampExtend {
  id: number;
}

export interface CartItemModelInterface
  extends Sequelize.Model<CartItemInterface, Partial<InputCartItemInterface>>,
    CartItemInterface {}
