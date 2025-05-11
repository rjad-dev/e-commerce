import { Request, Response } from "express";
import { Authenticate } from "../../middlewares";
import { UserInterface } from "../../interfaces";
import { OrdersService } from "../../services/ordersService";

export class OrdersController {
  public constructor() {}

  static async createOrder(req: Request, res: Response): Promise<Response> {
    try {
      const user = (
        await Authenticate.verifyAccessToken(req.headers.authorization)
      ).data as UserInterface;

      const { cartItemIds } = req.body;
      console.log(req.body)
      const order = await new OrdersService().create({
        userId: user.id,
        cartItemIds: cartItemIds,
      });

      return res.status(200).json({
        message: "Order created successfully.",
        data: order,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  static async getAllOrders(req: Request, res: Response): Promise<Response> {
    try {
      const user = (
        await Authenticate.verifyAccessToken(req.headers.authorization)
      ).data as UserInterface;

      const orders = await new OrdersService().findAll({ userId: user.id });

      return res.status(200).json({
        message: "Orders fetched successfully.",
        data: orders,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  static async checkout(req: Request, res: Response): Promise<Response> {
    try {
      const user = (
        await Authenticate.verifyAccessToken(req.headers.authorization)
      ).data as UserInterface;

      const { orderId } = req.params;
      const order = await new OrdersService().checkout({
        orderId: +orderId,
      });

      return res.status(200).json({
        message: "Checkout successfull.",
        data: order,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
}
