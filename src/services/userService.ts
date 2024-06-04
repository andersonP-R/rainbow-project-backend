import { Model } from "sequelize";
import UserModel from "../models/UserModel";
import { IUser } from "../interfaces/IUser";
import { initalData } from "../seed/seed-data";

/**
 * User services handler
 */
class UserService {
  /**
   * Get all users from db.
   * @returns UserModel[]
   */
  async getUsers() {
    const users = await UserModel.findAll();
    return users;
  }

  /**
   * Get one single user identify by id.
   * @param id
   * @returns
   */
  async getUser(id: string) {
    const user = await UserModel.findByPk(id);
    return user;
  }

  /**
   * Create a new user.
   * @param body
   * @returns
   */
  async createUser(body: IUser) {
    const isEmailInUse = await UserModel.findOne({
      where: {
        email: body.email,
      },
    });

    if (isEmailInUse) return { message: `Email ${body.email} in use` };

    const user = UserModel.build(body);
    await user.save();
    return user;
  }

  /**
   * Delete an user.
   * @param id
   * @returns
   */
  async deleteUser(id: string) {
    const user = await UserModel.findByPk(id);
    if (!user) return;
    await user.destroy();
    return user;
  }

  async seed() {
    // const user = UserModel.build(initalData.users[0]);
    // await user.save();
    // for (let ele of initalData.users) {
    //   const user = UserModel.build(ele);
    //   await user.save();
    // }
  }
}

export default new UserService();
