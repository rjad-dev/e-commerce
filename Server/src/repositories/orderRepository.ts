import Model from "../models";
import { BaseRepository } from ".";
import { InputOrderInterface, OrderInterface } from "../interfaces";

export class OrderRepository extends BaseRepository<
  InputOrderInterface,
  OrderInterface
> {
  constructor() {
    super(Model.Order);
  }
}
