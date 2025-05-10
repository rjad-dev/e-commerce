import { Database } from "../config";
import { DataTypes } from "sequelize";
import User from "./users";
import { CartModelInterface } from "../interfaces";

const sequelize = Database.sequelize;

const Cart = sequelize.define<CartModelInterface>(
  "carts",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id',
      references: {
        model: 'users',
        key: 'id'
      }
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
        name: 'carts_user_id',
        fields: ['user_id'],
        unique: true,
      },
    ],
  }
);

export default Cart;