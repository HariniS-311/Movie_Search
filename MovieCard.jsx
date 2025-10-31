import React from "react";

export default function MovieCard({ movie, isFav, onToggleFavorite, onOpenDetails }) {
  const { Title, Year, Poster, Type } = movie;
  const poster = Poster && Poster !== "N/A" ? Poster : "/placeholder.png";

  return (
    <article className="card">
      <div className="poster-wrap" onClick={onOpenDetails} role="button" tabIndex={0}>
        <img src={poster} alt={`${Title} poster`} />
      </div>
      <div className="card-body">
        <h3 title={Title}>{Title}</h3>
        <p className="meta">{Year} • {Type}</p>
        <div className="card-actions">
          <button onClick={onToggleFavorite}>{isFav ? "★ Remove" : "☆ Favorite"}</button>
          <button onClick={onOpenDetails}>Details</button>
        </div>
      </div>
    </article>
  );
}
