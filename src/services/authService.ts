import { generateJWT } from "../helpers/generate-jwt";
import UserModel from "../models/UserModel";

class AuthService {
  /**
   * Sign in method.
   * @returns
   */
  async signIn(email: string, pass: string) {
    // Check if the user exists
    const user = await UserModel.findOne({
      where: {
        email,
      },
    });

    if (!user) throw new Error();

    // Generate JWT token
    const token = await generateJWT(user.getDataValue("id"));

    return {
      user,
      token,
    };
  }
}

export default new AuthService();
