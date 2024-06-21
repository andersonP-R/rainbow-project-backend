import { generateJWT } from "../helpers/generate-jwt";
import prisma from "../lib/prisma";
import jwt from "jsonwebtoken";

class AuthService {
  /**
   * Login method.
   * @returns
   */
  async signIn(email: string, pass: string) {
    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw new Error("User doesn't exists");

    // Generate JWT token
    const token = await generateJWT(user.id);

    return {
      user,
      token,
    };
  }

  async getSession(token: string) {
    const { uid } = jwt.verify(token, process.env.JWTSECRET!) as jwt.JwtPayload;
    const user = await prisma.user.findFirst({ where: { id: uid } });
    return user;
  }
}

export default new AuthService();
