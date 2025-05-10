import { Request, Response } from "express";
import { Authenticate } from "../../middlewares";
import { CartItemInterface, UserInterface } from "../../interfaces";
import { CartsService } from "../../services";

export class CartsController {
  public constructor() {}

  static async getCartItems(req: Request, res: Response): Promise<Response> {
    try {
      const user = (
        await Authenticate.verifyAccessToken(req.headers.authorization)
      ).data as UserInterface;

      let cartItems:CartItemInterface[] = []

      const cart = await new CartsService().findOne({userId: user.id})
      if(cart) {
        cartItems = await new CartsService().findAllItems({cartId: cart.id})
      }
      return res.status(200).json({
        message: "Cart items fetched successfully.",
        data: cartItems
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

      const {productId, quantity} = req.body

      let cartExists
      cartExists = await new CartsService().findOne({userId: user.id})
      if (!cartExists) {
        cartExists = await new CartsService().create({
          userId: user.id
        })
      }

      const cartItem = await new CartsService().addItem({cartId: cartExists.id, productId, quantity})

      return res.status(200).json({
        message: "Item added to cart successfully.",
        data: cartItem
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

      const {itemId} = req.body

      await new CartsService().removeItem({itemId})

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
