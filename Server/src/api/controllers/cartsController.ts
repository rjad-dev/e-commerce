import { Request, Response } from "express";
import { Authenticate } from "../../middlewares";
import { UserInterface } from "../../interfaces";

export class CartsController {
  public constructor() {}

  static async getCartItems(req: Request, res: Response): Promise<Response> {
    try {
      const user = (
        await Authenticate.verifyAccessToken(req.headers.authorization)
      ).data as UserInterface;

      return res.status(200).json({
        message: "Cart items fetched successfully.",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  static async addToCart(req: Request, res: Response): Promise<Response> {
    try {
      const user = (
        await Authenticate.verifyAccessToken(req.headers.authorization)
      ).data as UserInterface;

      return res.status(200).json({
        message: "Item added to cart successfully.",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  static async removeFromCart(req: Request, res: Response): Promise<Response> {
    try {
      const user = (
        await Authenticate.verifyAccessToken(req.headers.authorization)
      ).data as UserInterface;

      return res.status(200).json({
        message: "Item removed from cart successfully.",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
}
