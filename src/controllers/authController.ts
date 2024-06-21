import { Response, Request } from "express";
// import authService from "../services/authService";
import UserModel from "../models/UserModel";
import { generateJWT } from "../helpers/generate-jwt";
import authService from "../services/authService";

/**
 * Users controller handler
 */
class AuthController {
  async signIn(req: Request, res: Response) {
    const { email, password: paramPass } = req.body;

    try {
      const userDB = await authService.signIn(email, paramPass);
      const { token, user } = userDB;

      if (!user) {
        return res.status(400).json({ message: "User doesn't exists." });
      }

      if (user.password !== paramPass) {
        return res
          .status(400)
          .json({ message: "User email/password invalid." });
      }

      const { password, ...rest } = user;

      res.cookie("access_token", token, { httpOnly: true }).status(200).json({
        user: rest,
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error });
    }
  }

  async getSession(req: Request, res: Response) {
    const { token } = req.params;
    try {
      const user = await authService.getSession(token);
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error });
    }
  }
}

export default new AuthController();
