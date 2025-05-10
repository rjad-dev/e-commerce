import { Database } from "../config";
import { DataTypes } from "sequelize";
import * as Sequelize from "sequelize";
import Order from "./orders";
import { PaymentStatusEnum } from "../enums";
import { PaymentsModelInterface } from "../interfaces";

const sequelize = Database.sequelize;

const Payment = sequelize.define<PaymentsModelInterface>(
  "payments",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "order_id",
      references: {
        model: "orders",
        key: "id",
      },
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    paymentMethod: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: "payment_method",
    },
    transactionId: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: "transaction_id",
    },
    status: {
      type: Sequelize.ENUM(
        PaymentStatusEnum.SUCCEEDED,
        PaymentStatusEnum.PENDING,
        PaymentStatusEnum.FAILED
      ),
      allowNull: false,
      defaultValue: PaymentStatusEnum.PENDING,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "updated_at",
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "deleted_at",
    },
  },
  {
    timestamps: true,
    paranoid: true,
    underscored: false,
    indexes: [
      {
        name: "payments_order_id",
        fields: ["order_id"],
        unique: true,
      },
      {
        name: "payments_transaction_id",
        fields: ["transaction_id"],
        unique: true,
        where: {
          transaction_id: {
            [Sequelize.Op.ne]: null,
          },
        },
      },
    ],
  }
);

Payment.belongsTo(Order, {
  foreignKey: "orderId",
  as: "order",
});

export default Payment;
