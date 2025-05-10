import Model from "../models";
import { BaseRepository } from ".";
import { InputProductInterface, ProductInterface } from "../interfaces";

export class ProductRepository extends BaseRepository<
  InputProductInterface,
  ProductInterface
> {
  constructor() {
    super(Model.Product);
  }
}
