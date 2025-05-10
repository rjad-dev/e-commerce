import { Database } from "../config";
import { DataTypes } from "sequelize";
import Cart from "./carts";
import Product from "./products";
import { CartItemModelInterface } from "../interfaces";

const sequelize = Database.sequelize;


const CartItem = sequelize.define<CartItemModelInterface>(
  "cart_Items", // Note: This matches the table name in the migration
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    cartId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'cart_id',
      references: {
        model: 'carts',
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
      defaultValue: 1,
    },
    expiryDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'expiry_date'
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
        name: 'cart_items_cart_id',
        fields: ['cart_id'],
      },
      {
        name: 'cart_items_product_id',
        fields: ['product_id'],
      },
    ],
  }
);

Cart.hasMany(CartItem, {
  foreignKey: 'cartId',
  as: 'cartItems'
});

export default CartItem;