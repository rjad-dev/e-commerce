import exceptionHandler from "../../middlewares/exceptionalHandler";
import { RouterClass } from "../classes";
import { CartsController, UsersController } from "../controllers";

export class CartsRoute extends RouterClass {
  constructor() {
    super();
  }

  define(): void {
    this.router.route("/").get(exceptionHandler(CartsController.getCartItems));
    this.router.route("/").patch(exceptionHandler(CartsController.addToCart));
    this.router.route("/").delete(exceptionHandler(CartsController.removeFromCart));
  }
}
