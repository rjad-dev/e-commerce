import { Router } from "express";
import { IrouteInteface } from "../../interfaces";
import { ProductsRoute } from "./productsRoute";
import { UsersRoute } from "./usersRoute";
import { CartssRoute } from "./cartsRoute";

class ProxyRouter {
  private static instance: ProxyRouter;
  private router: Router = Router();

  private readonly routes = [
    {
      segment: "/products",
      provider: ProductsRoute,
    },
    {
      segment: "/users",
      provider: UsersRoute,
    },
    {
      segment: "/carts",
      provider: CartssRoute,
    },
  ];

  private constructor() {}

  static get(): ProxyRouter {
    if (!ProxyRouter.instance) ProxyRouter.instance = new ProxyRouter();

    return ProxyRouter.instance;
  }

  map(): Router {
    this.routes.forEach((route: IrouteInteface) => {
      const instance = new route.provider() as { router: Router };
      this.router.use(route.segment, instance.router);
    });

    return this.router;
  }
}

const proxyRouter = ProxyRouter.get();
export { proxyRouter as ProxyRouter };
