import { Response, Request } from "express";
import userService from "../services/userService";

/**
 * Users controller handler
 */
class UserController {
  async test(req: Request, res: Response) {
    try {
      res.status(200).json({ message: "hello word!!" });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      const users = await userService.getUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }
}

export default new UserController();
