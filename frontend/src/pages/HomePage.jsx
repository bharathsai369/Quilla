import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import NotesNotFound from "../components/NotesNotFound";
import NoteCard from "../components/NoteCard";
import api from "../libs/axios";
import toast from "react-hot-toast";

export default function HomePage() {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [retryTimer, setRetryTimer] = useState(15);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noteToDelete, setNoteToDelete] = useState(null);

  const fetchNotes = async () => {
    try {
      const res = await api.get("/notes");
      setNotes(res.data);
      setIsRateLimited(false);
    } catch (err) {
      if (err?.response?.status === 429) {
        setIsRateLimited(true);
        setRetryTimer(15);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    if (!isRateLimited) return;

    const interval = setInterval(() => {
      setRetryTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          fetchNotes();
          return 15;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRateLimited]);

  const handleDelete = async () => {
    if (!noteToDelete) return;

    try {
      await toast.promise(api.delete(`/notes/${noteToDelete._id}`), {
        loading: "Deleting note...",
        success: "Note deleted",
        error: "Failed to delete note",
      });
      setNotes((prev) => prev.filter((n) => n._id !== noteToDelete._id));
    } finally {
      setNoteToDelete(null);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <Navbar />
      {isRateLimited ? (
        <RateLimitedUI retryIn={retryTimer} />
      ) : (
        <div className="max-w-7xl mx-auto p-4 mt-6">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <span className="loading loading-spinner loading-lg text-primary" />
            </div>
          ) : notes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {notes.map((note) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  onDeleteClick={setNoteToDelete}
                />
              ))}
            </div>
          ) : (
            <NotesNotFound />
          )}
        </div>
      )}

      {/* Modal */}
      {noteToDelete && (
        <div className="modal modal-open">
          <div className="modal-box bg-base-100 text-base-content border border-base-300">
            <h3 className="font-bold text-lg">Confirm Deletion</h3>
            <p className="py-4">
              Are you sure you want to delete <strong>{noteToDelete.title}</strong>?
            </p>
            <div className="modal-action justify-between">
              <button
                className="btn btn-outline"
                onClick={() => setNoteToDelete(null)}
              >
                Cancel
              </button>
              <button className="btn btn-error" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
