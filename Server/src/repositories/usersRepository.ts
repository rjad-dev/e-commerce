import Model from "../models";
import { BaseRepository } from ".";

export class UserRepository extends BaseRepository<unknown, unknown> {
    constructor(){
        super(Model.User)
    }
}