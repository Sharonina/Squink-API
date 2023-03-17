import { Express } from "express";
import UserRouter from "./modules/users/routes/user.route";
/* import NotesRouter from "./modules/notes/routes/note.route"; */

export default function routerApi(app: Express) {
  app.use("/users", UserRouter);
  /* app.use("/notes", NotesRouter); */
}
