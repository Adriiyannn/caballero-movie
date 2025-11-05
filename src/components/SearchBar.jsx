import React from "react";
import { Search } from "lucide-react";

export default function SearchBar({ searchTerm, setSearchTerm, onSearch }) {
  return (
    <div className="flex items-center gap-3 mt-6 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-md w-full max-w-md">
      <Search className="text-gray-400" size={20} />
      <input
        type="text"
        placeholder="Search for movies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
        className="flex-grow bg-transparent focus:outline-none text-white"
      />
      <button
        onClick={onSearch}
        className="bg-red-700 hover:bg-red-500 text-white px-4 py-1 rounded-full transition-all"
      >
        Search
      </button>
    </div>
  );
}
