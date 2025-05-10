import * as Sequelize from "sequelize";
import { ModelTimestampExtend } from "./modelInterface";
import { CartItemInterface } from "./cartItemsInterface";

export interface InputCartInterface {
  userId: number,
}

export interface CartInterface
  extends InputCartInterface,
    ModelTimestampExtend {
  id: number;
  cartItems?: CartItemInterface[]
}

export interface CartModelInterface
  extends Sequelize.Model<CartInterface, Partial<InputCartInterface>>,
    CartInterface {}
