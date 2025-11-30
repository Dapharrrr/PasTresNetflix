'use client';

import { useState, useEffect } from 'react';

export function useFavorites() {
    const [favorites, setFavorites] = useState<number[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem('pasnetflix_favorites');
        if (stored) {
            setFavorites(JSON.parse(stored));
        }
    }, []);

    const toggleFavorite = (movieId: number) => {
        const newFavorites = favorites.includes(movieId)
            ? favorites.filter(id => id !== movieId)
            : [...favorites, movieId];

        setFavorites(newFavorites);
        localStorage.setItem('pasnetflix_favorites', JSON.stringify(newFavorites));
    };

    const isFavorite = (movieId: number) => favorites.includes(movieId);

    return { favorites, toggleFavorite, isFavorite };
}
