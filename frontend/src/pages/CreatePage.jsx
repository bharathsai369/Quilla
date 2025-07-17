import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import api from "../libs/axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }

    const noteData = { title, content };

    setLoading(true);
    try {
      await toast.promise(
        api.post("/notes", noteData),
        {
          loading: "Creating note...",
          success: "Note created successfully!",
          error: (err) => {
            if (err.response?.status === 429) {
              return "Slow down! You're creating notes too fast!";
            }
            return "Failed to create note";
          },
        },
        {
          success: { icon: "✅" },
          error: { icon: "❌" },
          loading: { icon: "📝" },
        }
      );
      navigate("/");
    } catch (error) {
      console.error("Note creation failed:", error);
      // toast already handled inside promise
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-base-200">
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
              Create New Note
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title Field */}
              <div className="form-control">
                <label className="label pb-1">
                  <span className="label-text text-base font-medium">
                    Title
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Note Title"
                  className="input input-bordered w-full"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* Content Field */}
              <div className="form-control">
                <label className="label pb-1">
                  <span className="label-text text-base font-medium">
                    Content
                  </span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered w-full h-40 resize-none"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4 flex justify-center">
                <button
                  type="submit"
                  className="btn btn-primary btn-wide transition duration-300"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create Note"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
