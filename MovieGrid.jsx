import React from "react";
import MovieCard from "./MovieCard";

export default function MovieGrid({ movies, onToggleFavorite, favorites, onOpenDetails }) {
  if (!movies || movies.length === 0) {
    return <p className="muted">No movies to show.</p>;
  }

  return (
    <div className="grid">
      {movies.map((m) => (
        <MovieCard
          key={m.imdbID}
          movie={m}
          isFav={!!favorites.find((f) => f.imdbID === m.imdbID)}
          onToggleFavorite={() => onToggleFavorite(m)}
          onOpenDetails={() => onOpenDetails(m.imdbID)}
        />
      ))}
    </div>
  );
}
