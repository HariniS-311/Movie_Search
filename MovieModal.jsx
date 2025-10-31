import React from "react";

export default function MovieModal({ movie, loading, onClose, onToggleFavorite, isFav }) {
  if (loading && !movie) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✕</button>
        {!movie ? (
          <p>Loading details...</p>
        ) : (
          <div className="modal-content">
            <img src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"} alt={movie.Title} />
            <div className="modal-body">
              <h2>{movie.Title} ({movie.Year})</h2>
              <p><strong>Genre:</strong> {movie.Genre}</p>
              <p><strong>Runtime:</strong> {movie.Runtime}</p>
              <p><strong>Director:</strong> {movie.Director}</p>
              <p><strong>Actors:</strong> {movie.Actors}</p>
              <p><strong>Plot:</strong> {movie.Plot}</p>
              <div className="modal-actions">
                <button onClick={() => onToggleFavorite(movie)}>{isFav ? "★ Remove Favorite" : "☆ Add Favorite"}</button>
                <a href={`https://www.imdb.com/title/${movie.imdbID}`} target="_blank" rel="noreferrer">Open on IMDB</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
