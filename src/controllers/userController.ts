import { Response, Request } from "express";
import userService from "../services/userService";
import { IUser } from "../interfaces/IUser";

/**
 * Users controller handler
 */
class UserController {
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

    console.log("Authenticated user: ", req.user);

    try {
      const user = await userService.getUser(id);
      if (!user)
        return res.status(400).json({
          message: `Invalid token - user identify with id: ${id} doesn't exists.`,
        });

      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: `User ${id} doesn't exists` });
    }
  }

  async createUser(req: Request, res: Response) {
    const { body } = req;

    try {
      const { user, token, message } = await userService.createUser(body);
      res.status(201).json({ message, user, token });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: `Error creating user` });
    }
  }

  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const userDeleted = await userService.deleteUser(id);
      if (!userDeleted)
        return res
          .status(400)
          .json({ message: `User with id ${id} doesn't exists.` });

      res
        .status(201)
        .json({ message: "Successfuly deleted!", user: userDeleted });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: `Error deleting user` });
    }
  }

  async updateUser(req: Request, res: Response) {
    const { body } = req;
    const { id } = req.params;

    try {
      const user = await userService.updateUser(id, body);
      if (!user)
        return res
          .status(400)
          .json({ message: `User with id ${id} doesn't exists.` });

      res.status(200).json({ message: "Successfuly updated!", user });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: `Error updating user` });
    }
  }
}

export default new UserController();
