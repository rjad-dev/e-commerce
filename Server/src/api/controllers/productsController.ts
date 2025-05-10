import { Request, Response } from "express";
import { ProductsService } from "../../services";

export class ProductsController {
  public constructor() {}

  static async getProducts(req: Request, res: Response): Promise<Response> {
    const products = await new ProductsService().findAll();
    return res.status(200).json({
      data: products,
      maessage: "Products fetched successfully.",
    });
  }
}
