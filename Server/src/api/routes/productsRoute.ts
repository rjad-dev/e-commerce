import exceptionHandler from "../../middlewares/exceptionalHandler";
import { RouterClass } from "../classes";
import { ProductsController } from "../controllers";

export class ProductsRoute extends RouterClass {
  constructor() {
    super();
  }

  define(): void {
    this.router
      .route("/")
      .get(exceptionHandler(ProductsController.getProducts));
  }
}
