import Model from "../models";
import { BaseRepository } from ".";
import { InputCartInterface, CartInterface } from "../interfaces";

export class CartRepository extends BaseRepository<
  InputCartInterface,
  CartInterface
> {
  constructor() {
    super(Model.Cart);
  }
}
