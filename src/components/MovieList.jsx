import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export default function MovieList({ movies }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(saved);
  }, []);

  const toggleFavorite = (movie) => {
    let updated = [...favorites];
    const exists = favorites.some((fav) => fav.imdbID === movie.imdbID);

    if (exists) {
      updated = favorites.filter((fav) => fav.imdbID !== movie.imdbID);
    } else {
      updated.push(movie);
    }

    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  if (!movies || movies.length === 0) {
    return (
      <div className="text-center text-white mt-10">
        No movies found. Try searching for something else 🎥
      </div>
    );
  }

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center p-6"
      style={{
        backgroundImage: `url('/battlefield-bg.jpg')`,
      }}
    >
      <div className="grid gap-15 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mt-6 w-full max-w-7xl justify-items-center">
        {movies.map((movie) => {
          const isFav = favorites.some((fav) => fav.imdbID === movie.imdbID);
          return (
            <div
              key={movie.imdbID}
              className="relative bg-sky-900 bg-opacity-80 rounded-2xl overflow-hidden shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl backdrop-blur-sm"
            >
              {/* ❤️ Favorite Button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleFavorite(movie);
                }}
                className="absolute top-2 right-2 text-white"
              >
                <Heart
                  size={22}
                  fill={isFav ? "red" : "none"}
                  stroke="white"
                  className="cursor-pointer transition-transform hover:scale-110"
                />
              </button>

              {/* Poster */}
              <Link to={`/movie/${movie.imdbID}`}>
                <img
                  src={movie.Poster !== "N/A" ? movie.Poster : "/no-poster.jpg"}
                  alt={movie.Title}
                  className="w-52 h-80 object-cover"
                />
                <div className="p-3 text-center">
                  <h2 className="font-semibold text-white text-sm">{movie.Title}</h2>
                  <p className="text-white text-xs">{movie.Year}</p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
