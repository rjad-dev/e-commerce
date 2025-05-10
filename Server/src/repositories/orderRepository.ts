import Model from "../models";
import { BaseRepository } from ".";

export class OrderRepository extends BaseRepository<unknown, unknown> {
    constructor(){
        super(Model.Order)
    }
}