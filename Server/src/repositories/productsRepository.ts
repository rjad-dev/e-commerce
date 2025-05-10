import Model from "../models";
import { BaseRepository } from ".";

export class ProductRepository extends BaseRepository<unknown, unknown> {
    constructor(){
        super(Model.Product)
    }
}