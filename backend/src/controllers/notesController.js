import Note from "../models/note.js";

const getAllNotes = async (_, res) => {
  try {
    const notes = await Note.find({}).sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error("error in getAllNotes controller are: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "note not found" });

    res.status(200).json(note);
  } catch (error) {
    console.error("error in getNoteById controller are: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    console.log(title, content);
    const newNote = new Note({ title, content });

    await newNote.save();
    res.status(201).json({ message: "note created successfully" });
  } catch (error) {
    console.error("error in createNote controller are: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );

    if (!updatedNote)
      return res.status(404).json({ message: "note not found" });

    res.status(200).json({ message: "note updated successfully" });
  } catch (error) {
    console.error("error in updateNote controller are: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    if (!deletedNote)
      return res.status(404).json({ message: "note not found" });

    res.status(200).json({ message: "note deleted successfully" });
  } catch (error) {
    console.error("error in deleteNote controller are: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { getAllNotes, createNote, updateNote, deleteNote, getNoteById };
