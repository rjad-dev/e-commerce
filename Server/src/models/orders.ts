import { Database } from "../config";
import { DataTypes } from "sequelize";
import * as Sequelize from "sequelize";
import User from "./users";
import { OrderStatusEnum } from "../enums";
import { OrderModelInterface } from "../interfaces";

const sequelize = Database.sequelize;

const Order = sequelize.define<OrderModelInterface>(
  "orders",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "user_id",
      references: {
        model: "users",
        key: "id",
      },
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: "total_amount",
    },
    status: {
      type: Sequelize.ENUM(
        OrderStatusEnum.PENDING,
        OrderStatusEnum.CANCELLED,
        OrderStatusEnum.COMPLETED
      ),
      allowNull: false,
      defaultValue: OrderStatusEnum.PENDING,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
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
        name: "orders_user_id",
        fields: ["user_id"],
        where: {
          deletedAt: null,
        },
      },
    ],
  }
);

Order.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

export default Order;
