import {
  createNote,
  getAllNotes,
  updateNoteById,
} from "./../services/note.service";
import express, { Request, Response, NextFunction } from "express";
import { verifyTokenMiddleware } from "../../../middleware/auth";
const router = express.Router();

router.use(verifyTokenMiddleware);

// get all notes by user
router.get("/", async (req, res, next) => {
  try {
    const { user_id } = res.locals.user;
    const notes = await getAllNotes(user_id);
    res.status(200).send(notes);
  } catch (error) {
    next(error);
  }
});

// create note
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req;
    const { user_id } = res.locals.user;
    const user = await createNote(user_id, body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

// update note by id
router.put("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req;
    const { user_id } = res.locals.user;
    const user = await updateNoteById(user_id, body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

//delete note by id

export default router;
