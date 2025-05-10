import { Request, Response } from "express";

export class ProductsController {
  public constructor() {}

  static async getProducts(req: Request, res: Response): Promise<Response> {
    return res.status(200).json({
      maessage: "Products fetched successfully.",
    });
  }
}
