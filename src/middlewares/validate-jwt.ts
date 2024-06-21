import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import prisma from "../lib/prisma";

export const validateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const token = req.header("api-token");
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const { uid } = jwt.verify(token, process.env.JWTSECRET!) as jwt.JwtPayload;
    const user = await prisma.user.findFirst({ where: { id: uid } });
    if (!user) {
      return res
        .status(400)
        .json({ message: `User with id: ${uid} doesn't exists.` });
    }

    const { password, ...userRest } = user;

    req.user = userRest;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Invalid token" });
  }
};
