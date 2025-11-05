import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import TopNav from "../components/NavigationBar";

const OMDB_API_URL = "https://www.omdbapi.com?apikey=699b25b0";

// ✅ Declare your YouTube API key ONCE (from .env)
const YT_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [error, setError] = useState("");

  // 🔹 Fetch movie details from OMDb
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`${OMDB_API_URL}&i=${id}&plot=full`);
        const data = await response.json();
        if (data.Response === "True") {
          setMovie(data);
        } else {
          setError("Movie not found.");
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setError("Failed to load movie details.");
      }
    };
    fetchMovieDetails();
  }, [id]);

  // 🔹 Fetch trailer from YouTube
  useEffect(() => {
    const fetchTrailer = async () => {
      if (!movie?.Title || !YT_API_KEY) return;

      try {
        const query = encodeURIComponent(`${movie.Title} official trailer`);
        const youtubeUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=${query}&key=${YT_API_KEY}`;

        const res = await fetch(youtubeUrl);
        const data = await res.json();

        if (data.items && data.items.length > 0) {
          const videoId = data.items[0].id.videoId;
          setTrailerUrl(`https://www.youtube.com/embed/${videoId}`);
        } else {
          setTrailerUrl("");
          console.warn("No trailer found for:", movie.Title);
        }
      } catch (err) {
        console.error("Error fetching trailer:", err);
      }
    };

    fetchTrailer();
  }, [movie]);

  if (error) {
    return (
      <div className="text-center mt-20 text-red-500">
        {error}
      </div>
    );
  }

  if (!movie) {
    return <div className="text-center mt-10 text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pb-20">
      <TopNav />

      <div className="pt-14">
        <Link to="/" className="text-white font-bold mb-4 block">
          ← Back to Home
        </Link>

        <div className="flex flex-col items-center">
          <img
            src={movie.Poster !== "N/A" ? movie.Poster : "/no-poster.jpg"}
            alt={movie.Title}
            className="rounded-lg shadow-lg w-64 mb-4"
          />
          <h1 className="text-3xl font-bold mb-2">{movie.Title}</h1>

          <p className="text-gray-400 mb-1">🕒 Duration: {movie.Runtime}</p>
          <p className="text-gray-400 mb-1">Released: {movie.Released}</p>
          <p className="text-gray-400 mb-2">Genre: {movie.Genre}</p>
          <p className="text-gray-300 mb-2 text-center">{movie.Plot}</p>
          <p className="text-gray-400 mb-1">⭐ IMDb Rating: {movie.imdbRating}</p>
          <p className="text-gray-400 mb-1">Cast: {movie.Actors}</p>
          <p className="text-gray-400 mb-4">Director: {movie.Director}</p>

          {/* 🎬 Trailer Embed */}
          {trailerUrl ? (
            <div className="w-full max-w-xl aspect-video rounded-lg overflow-hidden shadow-lg mt-4">
              <iframe
                width="100%"
                height="100%"
                src={trailerUrl}
                title={`${movie.Title} Trailer`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <p className="text-gray-500 mt-6 italic">
              🎥 No trailer found for this movie.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
