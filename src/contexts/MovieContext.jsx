import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    // Load from localStorage on mount
    useEffect(() => {
        const storedFavs = localStorage.getItem("favorites");
        if (storedFavs) setFavorites(JSON.parse(storedFavs));
    }, []);

    // Save to localStorage on change
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    // Add movie
    const addToFavorites = (movie) => {
        setFavorites((prev) => [...prev, movie]);
    };

    // Remove movie
    const removeFromFavorites = (movieId) => {
        setFavorites((prev) => prev.filter((movie) => movie.imdbID !== movieId));
    };

    // Check if movie is already favorite
    const isFavorite = (movieId) => {
        return favorites.some((movie) => movie.imdbID === movieId);
    };

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        
    };

    return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
};
