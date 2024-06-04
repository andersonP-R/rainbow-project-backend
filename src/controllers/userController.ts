import { Response, Request } from "express";
import userService from "../services/userService";
import { IUser } from "../interfaces/IUser";

/**
 * Users controller handler
 */
class UserController {
  async seed(req: Request, res: Response) {
    try {
      await userService.seed();
      res.status(200).json({ message: "Done!" });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      const users = await userService.getUsers();
      res.status(200).json({ users });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  async getUser(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const user = await userService.getUser(id);
      if (!user)
        return res
          .status(400)
          .json({ message: `User identify with id ${id} doesn't exists.` });

      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: `User ${id} doesn't exists` });
    }
  }

  async createUser(req: Request, res: Response) {
    // const body: IUser = req.body;
    const { body } = req;

    try {
      const result = await userService.createUser(body);
      res.status(201).json(result);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: `Error creating user` });
    }
  }

  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const result = await userService.deleteUser(id);
      if (!result)
        return res
          .status(400)
          .json({ message: `User with id ${id} doesn't exists.` });

      res.status(201).json({ message: "Successfuly deleted!", user: result });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: `Error deleting user` });
    }
  }
}

export default new UserController();
