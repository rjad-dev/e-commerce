import jwt from "jsonwebtoken";
import { SignOptions } from "jsonwebtoken";

import { accessTokenExpiresIn, jwtClientSecret } from "../config";

class Authenticate {
  private static instance: Authenticate;
  constructor() {}

  public static get(): Authenticate {
    if (!Authenticate.instance) Authenticate.instance = new Authenticate();

    return Authenticate.instance;
  }

  public async generateAcessToken(payload: any) {
    const options: SignOptions = {
      expiresIn: accessTokenExpiresIn,
      algorithm: "HS512"
    };

    return jwt.sign(
      { id: payload.id, email: payload.email },
      jwtClientSecret,
      options
    );
  }

  public async verifyAccessToken(token: string) {
    try {
      const decoded = jwt.verify(token, jwtClientSecret);
      return { success: true, data: decoded };
    } catch (error) {
      throw new Error(error)
    }
  }
}

const authenticate = Authenticate.get();
export { authenticate as Authenticate };
