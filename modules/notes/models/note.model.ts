import { uuid } from "uuidv4";
import mongoose, { Types } from "mongoose";

export interface NoteBody {
  title: string;
  content: string;
  color: string;
}

export interface INote extends NoteBody {
  uuid: string;
  created_at: Date;
  updated_at: Date;
  user: Types.ObjectId;
}

const noteSchema = new mongoose.Schema<INote>({
  title: { type: String, default: null, required: true },
  content: { type: String, default: null, required: true },
  color: { type: String, default: null, required: true },
  uuid: { type: String, required: true, default: uuid() },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    default: null,
    required: true,
  },
  created_at: { type: Date, default: new Date(), required: true },
  updated_at: { type: Date, default: new Date(), required: false },
});

noteSchema.index({ user: 1 });
export const NoteModel = mongoose.model("note", noteSchema);
