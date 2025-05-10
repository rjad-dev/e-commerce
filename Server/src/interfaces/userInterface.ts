import * as Sequelize from "sequelize";
import { ModelTimestampExtend } from "./modelInterface";

export interface InputUserInterface {
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  isAdmin?: boolean;
}

export interface UserInterface
  extends InputUserInterface,
    ModelTimestampExtend {
  id: number;
}

export interface UserModelInterface
  extends Sequelize.Model<UserInterface, Partial<InputUserInterface>>,
    UserInterface {}
