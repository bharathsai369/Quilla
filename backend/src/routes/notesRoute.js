import express from "express";
import { body } from "express-validator";
import {
  createNote,
  deleteNote,
  getAllNotes,
  updateNote,
  getNoteById,
} from "../controllers/notesController.js";

const router = express.Router();

router.get("/", getAllNotes);

router.get("/:id", getNoteById);

// router.post("/", createNote);

router.post(
  "/",
  [
    body("title").isLength({ min: 1 }).trim().escape(),
    body("content").optional().trim().escape(),
  ],
  createNote
);

router.put("/:id", updateNote);

router.delete("/:id", deleteNote);

export default router;
