import * as Sequelize from "sequelize";
import { ModelTimestampExtend } from "./modelInterface";

export interface InputProductInterface {
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  imageUrl: string;
}

export interface ProductInterface
  extends InputProductInterface,
    ModelTimestampExtend {
  id: number;
}

export interface ProductModelInterface
  extends Sequelize.Model<ProductInterface, Partial<InputProductInterface>>,
    ProductInterface {}
