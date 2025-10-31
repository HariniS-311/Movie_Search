import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [text, setText] = useState("");

  const submit = (e) => {
    e.preventDefault();
    onSearch(text.trim());
  };

  return (
    <form className="searchbar" onSubmit={submit}>
      <input
        aria-label="Search movies"
        placeholder="Search movies by title..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}
