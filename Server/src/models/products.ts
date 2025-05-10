import { Database } from "../config";
import { DataTypes } from "sequelize";
import { ProductModelInterface } from "../interfaces";
import CartItem from "./cartItems";
import OrderItem from "./orderItems";

const sequelize = Database.sequelize;

const Product = sequelize.define<ProductModelInterface>(
  "products",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    stockQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: "stock_quantity",
    },
    imageUrl: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: "image_url",
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
        name: "products_name",
        fields: ["name"],
        where: {
          deletedAt: null,
        },
      },
    ],
  }
);

Product.hasMany(CartItem, {
  foreignKey: 'productId',
  as: 'cartItems'
});

Product.hasMany(OrderItem, {
  foreignKey: 'productId',
  as: 'orderItems'
});

export default Product;
