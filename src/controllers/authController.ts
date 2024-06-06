import { Response, Request } from "express";
// import authService from "../services/authService";
import UserModel from "../models/UserModel";
import { generateJWT } from "../helpers/generate-jwt";

/**
 * Users controller handler
 */
class AuthController {
  async signIn(req: Request, res: Response) {
    const { email, password: paramPass } = req.body;

    try {
      const user = await UserModel.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        return res.status(400).json({ message: "User doesn't exists." });
      }

      if (user.getDataValue("password") !== paramPass) {
        return res
          .status(400)
          .json({ message: "User email/password invalid." });
      }

      const token = await generateJWT(user.getDataValue("id"));
      const { password, ...rest } = user.dataValues;

      res.status(200).json({
        user: rest,
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error });
    }
  }
}

export default new AuthController();
