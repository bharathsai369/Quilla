import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import api from "../libs/axios";
import {
  ArrowLeftIcon,
  LoaderIcon,
  Trash2Icon,
  SaveIcon,
} from "lucide-react";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.error("Error fetching note:", error);
        toast.error("Failed to load note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Both title and content are required");
      return;
    }

    setSaving(true);
    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated");
      navigate("/");
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete note");
    }
  };

  if (loading || !note) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <LoaderIcon className="animate-spin size-10 text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl space-y-6">
        <Link
          to="/"
          className="btn btn-ghost hover:border-amber-100 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          <ArrowLeftIcon className="size-4" />
          Back to Notes
        </Link>

        <div className="card bg-base-100/70 backdrop-blur-md shadow-xl border border-base-300">
          <div className="card-body">
            <h2 className="text-3xl font-semibold text-base-content mb-6 text-center">
              Edit Note
            </h2>

            <div className="form-control mb-4">
              <label className="label pb-1">
                <span className="label-text font-medium">Title</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={note.title}
                onChange={(e) =>
                  setNote({ ...note, title: e.target.value })
                }
              />
            </div>

            <div className="form-control mb-4">
              <label className="label pb-1">
                <span className="label-text font-medium">Content</span>
              </label>
              <textarea
                className="textarea textarea-bordered w-full h-40 resize-none"
                value={note.content}
                onChange={(e) =>
                  setNote({ ...note, content: e.target.value })
                }
              />
            </div>

            <div className="flex justify-between pt-2">
              <button
                type="button"
                className="btn btn-error btn-outline"
                onClick={() => setShowModal(true)}
              >
                <Trash2Icon className="size-4" />
                Delete
              </button>

              <button
                type="button"
                className="btn btn-primary"
                disabled={saving}
                onClick={handleSave}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box border border-base-300 bg-base-100">
            <h3 className="font-bold text-lg mb-2">Delete Note?</h3>
            <p className="text-sm mb-4">
              Are you sure you want to delete this note permanently?
            </p>
            <div className="modal-action justify-between">
              <button className="btn btn-outline" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="btn btn-error" onClick={confirmDelete}>
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteDetailPage;
