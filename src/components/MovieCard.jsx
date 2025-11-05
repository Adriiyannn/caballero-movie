function MovieCard({ movie }) {
  return (
    <div className="bg-white shadow rounded-lg p-3 text-center">
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"}
        alt={movie.Title}
        className="w-full h-64 object-cover rounded-md"
      />
      <h2 className="font-bold mt-2">{movie.Title}</h2>
      <p className="text-sm text-white">{movie.Year}</p>
    </div>
  );
} 

export default MovieCard;
