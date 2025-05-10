import * as Sequelize from "sequelize";
import { ModelTimestampExtend } from "./modelInterface";
import { OrderStatusEnum } from "../enums";

export interface InputOrderInterface {
  userId: number;
  totalAmount: number;
  status: OrderStatusEnum;
}

export interface OrderInterface
  extends InputOrderInterface,
    ModelTimestampExtend {
  id: number;
}

export interface OrderModelInterface
  extends Sequelize.Model<OrderInterface, Partial<InputOrderInterface>>,
    OrderInterface {}
