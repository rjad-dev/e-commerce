import Model from "../models";
import { BaseRepository } from ".";

export class PaymentRepository extends BaseRepository<unknown, unknown> {
    constructor(){
        super(Model.Payment)
    }
}