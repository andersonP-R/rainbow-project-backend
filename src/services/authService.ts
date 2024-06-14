import { generateJWT } from "../helpers/generate-jwt";
import prisma from "../lib/prisma";

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
}

export default new AuthService();
