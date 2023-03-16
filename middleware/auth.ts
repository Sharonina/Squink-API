import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { errorObject } from "../utils/errors.utils";
import config from "../config";

export type Decoded = {
  user_id: string;
  email: string;
  exp: number;
};

export const verifyTokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"];

  if (!token) {
    const error = errorObject(401, "Token is required for auth");
    next(error);
  }

  try {
    if (!token) {
      throw new Error("Token not found");
    }
    const decoded = jwt.verify(token, config.JWT_SECRET) as Decoded;
    const today = Date.now() / 1000; //trae fecha en timestamp: ms
    const expirationDate = decoded.exp;
    if (expirationDate < today) {
      const error = errorObject(401, "Token has expired");
      next(error);
    }
    res.locals.user = decoded;
  } catch (err) {
    const error = errorObject(401, "Invalid token");
    next(error);
  }
  return next();
};
