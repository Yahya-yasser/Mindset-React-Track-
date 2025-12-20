/*eslint-disable react/prop-types*/
import { createContext, useContext, useEffect, useState } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('favorites');
        try {
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const addFavorite = (movie) => {
        if (!favorites.some(f => f.imdbID === movie.imdbID)) {
            setFavorites([...favorites, movie]);
        }
    };

    const removeFavorite = (id) => {
        setFavorites(favorites.filter(f => f.imdbID !== id));
    };

    const isFavorite = (id) => favorites.some(f => f.imdbID === id);

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};
