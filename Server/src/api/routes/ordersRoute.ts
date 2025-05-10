import exceptionHandler from "../../middlewares/exceptionalHandler";
import { RouterClass } from "../classes";
import { OrdersController } from "../controllers";

export class OrdersRoute extends RouterClass {
  constructor() {
    super();
  }

  define(): void {
    this.router.route("/").post(exceptionHandler(OrdersController.createOrder));
    this.router.route("/").get(exceptionHandler(OrdersController.getAllOrders));
    this.router.route("/:orderId/checkout").patch(exceptionHandler(OrdersController.checkout));
  }
}
