import React from "react";

export default function Favorites({ favorites, onToggleFavorite, onOpenDetails }) {
  if (!favorites || favorites.length === 0) return <p className="muted">No favorites yet.</p>;

  return (
    <div className="fav-grid">
      {favorites.map((m) => (
        <div className="fav-card" key={m.imdbID}>
          <img src={m.Poster !== "N/A" ? m.Poster : "/placeholder.png"} alt={m.Title} />
          <div className="fav-info">
            <strong>{m.Title}</strong>
            <small>{m.Year}</small>
            <div>
              <button onClick={() => onOpenDetails(m.imdbID)}>Details</button>
              <button onClick={() => onToggleFavorite(m)}>Remove</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
