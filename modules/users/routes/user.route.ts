import express, { Request, Response, NextFunction } from "express";
import { verifyTokenMiddleware } from "../../../middleware/auth";
import { createUser, getUserById, login } from "../services/user.service";

const router = express.Router();

const authenticationMiddlewares = [verifyTokenMiddleware];

router.get(
  "/me",
  authenticationMiddlewares,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user_id } = res.locals.user;
      const user = await getUserById(user_id);
      res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body;
    const user = await createUser(body);
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
      const loginResponse = await login(body);
      res.status(200).send(loginResponse);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
