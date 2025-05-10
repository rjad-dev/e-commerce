import { ProductRepository } from "../repositories";

export class ProductsService {
  private repository: ProductRepository;
  constructor() {
    this.repository = new ProductRepository();
  }

  async findAll() {
    return this.repository.findAll({});
  }
}
