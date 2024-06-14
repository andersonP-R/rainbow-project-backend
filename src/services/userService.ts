import { generateJWT } from "../helpers/generate-jwt";
import prisma from "../lib/prisma";
import type { User } from "@prisma/client";

/**
 * User services handler
 */
class UserService {
  /**
   * Get all users from db.
   * @returns
   */
  async getUsers() {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
    return users;
  }

  /**
   * Get one single user identify by id.
   * @param id
   * @returns
   */
  async getUser(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        name: true,
        email: true,
        role: true,
      },
    });
    return user;
  }

  /**
   * Create a new user.
   * @param body
   * @returns
   */
  async createUser(body: User) {
    const isEmailInUse = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (isEmailInUse) return { message: `Email ${body.email} in use` };

    const user = await prisma.user.create({
      data: body,
    });

    const token = await generateJWT(user.id);

    return { user, token };
  }

  /**
   * Delete an user.
   * @param id
   * @returns
   */
  async deleteUser(id: string) {
    const user = await prisma.user.delete({
      where: {
        id,
      },
    });
    return user;
  }

  /**
   * Delete an user.
   * @param id
   * @returns
   */
  async updateUser(id: string, body: User) {
    const updateUser = await prisma.user.update({
      where: {
        id,
      },
      data: body,
    });

    return updateUser;
  }
}

export default new UserService();
