import { Database } from "../config";
import { DataTypes } from "sequelize";
import { UserModelInterface } from "../interfaces";
import Cart from "./carts";
import Order from "./orders";

const sequelize = Database.sequelize;

const User = sequelize.define<UserModelInterface>(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "password",
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      field: "email",
    },
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: "first_name",
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: "last_name",
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: "is_admin",
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
        unique: true,
        name: "users_email",
        fields: ["email"],
        where: {
          deleted_at: null,
        },
      },
    ],
  }
);

User.hasOne(Cart, {
  foreignKey: 'userId',
  as: 'cart'
});

Cart.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

User.hasMany(Order, {
  foreignKey: 'userId',
  as: 'orders'
});

export default User;
