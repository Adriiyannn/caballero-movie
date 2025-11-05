import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TopNav from "../components/NavigationBar"; // your top nav component

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(saved);
  }, []);

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-gray-900 text-white relative"
      style={{
        backgroundImage: `url('/battlefield-bg.jpg')`,
      }}
    >
      {/* ✅ Fixed Top Navigation */}
      <TopNav />

      {/* ✅ Add top padding so content isn’t hidden behind the nav */}
      <div className="pt-16 flex flex-col items-center p-6">
        {favorites.length === 0 ? (
          <div className="text-center mt-10">
            No favorites yet ❤️ <br /> Start adding your favorite movies!
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-6">My Favorite Movies ❤️</h1>

            <div className="grid gap-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 mt-6 w-full max-w-7xl justify-items-center">
              {favorites.map((movie) => (
                <Link
                  key={movie.imdbID}
                  to={`/movie/${movie.imdbID}`}
                  className="bg-sky-900 bg-opacity-80 rounded-2xl overflow-hidden shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl backdrop-blur-sm"
                >
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
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
