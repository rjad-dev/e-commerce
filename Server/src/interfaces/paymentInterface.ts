import * as Sequelize from "sequelize";
import { ModelTimestampExtend } from "./modelInterface";
import { PaymentStatusEnum } from "../enums";

export interface InputPaymentsInterface {
  orderId: number;
  amount: number;
  paymentMethod: string;
  transactionId: string;
  status: PaymentStatusEnum;
}

export interface PaymentsInterface
  extends InputPaymentsInterface,
    ModelTimestampExtend {
  id: number;
}

export interface PaymentsModelInterface
  extends Sequelize.Model<PaymentsInterface, Partial<InputPaymentsInterface>>,
    PaymentsInterface {}
