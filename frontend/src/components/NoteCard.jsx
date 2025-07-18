import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../libs/utils";

export default function NoteCard({ note, onDeleteClick }) {
  return (
    <div className="card bg-base-100/70 backdrop-blur-md border border-base-300 shadow-md hover:shadow-xl transition-all duration-200 rounded-xl p-1">
      <Link to={`/note/${note._id}`} className="card-body">
        <h3 className="card-title text-base-content text-xl font-semibold">
          {note.title}
        </h3>
        <pre className="text-base-content/70 line-clamp-3 text-sm">
          {note.content}
        </pre>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-xs text-base-content/60">
            {formatDate(new Date(note.createdAt))}
          </span>
          <div className="flex items-center gap-2">
            <PenSquareIcon className="size-4 text-base-content/70" />
            <button
              className="btn btn-ghost btn-xs text-error"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onDeleteClick(note);
              }}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
