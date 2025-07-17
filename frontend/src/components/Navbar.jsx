import React from "react";
import { Link } from "react-router";
import { PlusIcon } from "lucide-react";

export default function Navbar() {
  return (
    <div className="navbar bg-base-200 shadow-sm space-x-3">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Quilla</a>
      </div>
      <div className="flex-none mr-15">
        <Link className="btn btn-ghost hover:btn-success" to={"/create"}>
          <PlusIcon />
          <span>New Note</span>
        </Link>
      </div>
    </div>
  );
}
