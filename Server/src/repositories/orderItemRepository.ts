import Model from "../models";
import { BaseRepository } from ".";
import { InputOrderItemsInterface, OrderItemsInterface } from "../interfaces";

export class OrderItemRepository extends BaseRepository<
  InputOrderItemsInterface,
  OrderItemsInterface
> {
  constructor() {
    super(Model.OrderItem);
  }
}
