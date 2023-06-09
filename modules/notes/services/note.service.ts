import mongoose from "mongoose";
import { errorObject } from "../../../utils/errors.utils";
import { NoteBody, NoteModel } from "../models/note.model";

// Get all notes by user
export const getAllNotes = async (user_id: string) => {
  return await NoteModel.find({ user: user_id }).exec();
};

// Create note
export const createNote = async (user_id: string, noteData: NoteBody) => {
  // validate request
  const { title, content, color } = noteData;
  if (!(content && color && title)) {
    throw errorObject(400, "All input is required");
  }

  // create note in db
  const note = await NoteModel.create({
    title,
    content,
    color,
    user: user_id,
  });

  //return new note
  note.save();
  return { note };
};

//update note by id
export const updateNoteById = async (noteId: string, noteData: NoteBody) => {
  const isMongoId = mongoose.Types.ObjectId.isValid(noteId);
  if (!isMongoId) {
    throw errorObject(400, "Invalid note id");
  }

  const note = await NoteModel.findByIdAndUpdate(
    noteId,
    { $set: noteData },
    { new: true }
  ).exec();

  if (!note) {
    throw errorObject(404, "Note not found");
  }

  return note;
};

// delete note by id
export const deleteNoteById = async (user_id: string, note_id: string) => {
  const isMongoId = mongoose.Types.ObjectId.isValid(note_id);
  if (!isMongoId) {
    throw errorObject(400, "Invalid note id");
  }

  const note = await NoteModel.findByIdAndDelete(note_id).exec();
  if (!note) {
    throw errorObject(404, "Note not found");
  }
  return note;
};
