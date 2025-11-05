import React from "react";
import { Film } from "lucide-react";

export default function Header() {
  return (
    <header className="text-center mt-10">
      <div className="flex justify-center items-center gap-2 text-4xl font-bold text-white">
        <Film className="w-8 h-8" />
        <h1>MovieList</h1>
      </div>
      <p className="text-white mt-2">
        Find and explore your favorite movies instantly 🍿
      </p>
    </header>
  );
}
