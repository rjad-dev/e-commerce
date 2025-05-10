import { Database } from "../config";
import { DataTypes } from "sequelize";
import Order from "./orders";
import Product from "./products";

const sequelize = Database.sequelize;

const OrderItem = sequelize.define<any>(
  "order_items",
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
      field: 'order_id',
      references: {
        model: 'orders',
        key: 'id'
      }
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'product_id',
      references: {
        model: 'products',
        key: 'id'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    priceAtPurchase: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: 'price_at_purchase'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'updated_at'
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'deleted_at'
    },
  },
  {
    timestamps: true,
    paranoid: true,
    underscored: false,
    indexes: [
      {
        name: 'order_items_order_id',
        fields: ['order_id'],
      },
      {
        name: 'order_items_product_id',
        fields: ['product_id'],
      },
    ],
  }
);

OrderItem.belongsTo(Order, {
  foreignKey: 'orderId',
  as: 'order'
});

OrderItem.belongsTo(Product, {
  foreignKey: 'productId',
  as: 'product'
});

export default OrderItem;