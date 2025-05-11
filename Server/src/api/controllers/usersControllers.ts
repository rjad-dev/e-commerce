import { Request, Response } from "express";
import { UsersService } from "../../services/usersService";
import { Authenticate } from "../../middlewares";

export class UsersController {
  public constructor() {}

  static async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;

      const userExists = await new UsersService().findOne({ email });
      if (!userExists) throw new Error("User does not exist.");
      if (password !== userExists.password) {
        throw new Error("Incorrect password");
      }

      const accessToken = await Authenticate.generateAcessToken(userExists);

      return res.status(200).json({
        message: "Login successfull.",
        data: {
          accessToken: accessToken,
          user: userExists
        },
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
}
