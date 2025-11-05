import { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import Footer from "./components/Footer";
import BottomNav from "./components/NavigationBar";
import Favorites from "./components/Favorites";
import "./index.css";

const API_URL = "https://www.omdbapi.com?apikey=3b0f9411";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("Conjuring");

  const fetchMovies = async () => {
    if (!searchTerm.trim()) {
      setMovies([]);
      return;
    }

    try {
      const response = await fetch(`${API_URL}&s=${encodeURIComponent(searchTerm)}`);
      const data = await response.json();
      setMovies(data.Search || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100 transition-colors duration-500 pb-16">
      <Header />
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={fetchMovies}
      />
      <div className="w-full flex justify-center px-4 sm:px-6 lg:px-8">
        <MovieList movies={movies} />
      </div>
      <Footer />
      <BottomNav />
    </div>
  );
}
