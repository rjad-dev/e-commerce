import Model from "../models";
import { BaseRepository } from ".";
import { CartItemInterface, InputCartItemInterface } from "../interfaces";

export class CartItemRepository extends BaseRepository<
  InputCartItemInterface,
  CartItemInterface
> {
  constructor() {
    super(Model.CartItem);
  }
}
