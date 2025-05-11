import exceptionHandler from "../../middlewares/exceptionalHandler";
import { RouterClass } from "../classes";
import { UsersController } from "../controllers";

export class UsersRoute extends RouterClass {
  constructor() {
    super();
  }

  define(): void {
    this.router.route("/login").post(exceptionHandler(UsersController.login));
  }
}
