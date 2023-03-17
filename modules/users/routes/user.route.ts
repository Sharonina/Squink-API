import express, { Request, Response, NextFunction } from "express";
import { verifyTokenMiddleware } from "../../../middleware/auth";
import UserService from "../services/user.service";

const userService = new UserService();
const router = express.Router();

const authenticationMiddlewares = [verifyTokenMiddleware];

router.get(
  "/me",
  authenticationMiddlewares,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers["authorization"] || "";
      const user = await userService.getUserByToken(token);
      res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body;
    const user = await userService.createUser(body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      const loginResponse = await userService.login(body);
      res.status(200).send(loginResponse);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
