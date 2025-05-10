import Model from "../models";
import { BaseRepository } from ".";

export class OrderItemRepository extends BaseRepository<unknown, unknown> {
    constructor(){
        super(Model.OrderItem)
    }
}