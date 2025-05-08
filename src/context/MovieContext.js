import React, { createContext, useEffect, useState } from "react";

export const MovieContext = createContext();

const MovieProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState(() => {
    return localStorage.getItem("lastSearch") || "";
  });

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  // Persist search term
  useEffect(() => {
    localStorage.setItem("lastSearch", searchTerm);
  }, [searchTerm]);

  // Persist favorites
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (movie) => {
    setFavorites((prev) => {
      const isFav = prev.find((m) => m.id === movie.id);
      if (isFav) return prev.filter((m) => m.id !== movie.id);
      return [...prev, movie];
    });
  };

  return (
    <MovieContext.Provider
      value={{ searchTerm, setSearchTerm, favorites, toggleFavorite }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MovieProvider;
