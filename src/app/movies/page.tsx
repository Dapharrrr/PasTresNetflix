'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { getPopularMovies, searchMovies } from '@/lib/tmdb';
import { Movie } from '@/types';
import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import FilterBar from '@/components/FilterBar';

export default function CatalogPage() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [minRating, setMinRating] = useState(0);
    const [sortBy, setSortBy] = useState<'popularity' | 'vote_average'>('popularity');

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            setError(null);
            try {
                let results: Movie[] = [];
                if (searchQuery.trim()) {
                    const data = await searchMovies(searchQuery);
                    results = data.results;
                } else {
                    const data = await getPopularMovies();
                    results = data.results;
                }
                setMovies(results);
            } catch (err) {
                setError("Impossible de charger les films. Veuillez réessayer plus tard.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        const timeoutId = setTimeout(() => {
            fetchMovies();
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    // Filter and Sort using useMemo
    const filteredAndSortedMovies = useMemo(() => {
        let result = [...movies];

        // Filter by rating
        if (minRating > 0) {
            result = result.filter(movie => movie.vote_average >= minRating);
        }

        // Sort
        result.sort((a, b) => {
            if (sortBy === 'popularity') {
                return b.popularity - a.popularity;
            } else {
                return b.vote_average - a.vote_average;
            }
        });

        return result;
    }, [movies, minRating, sortBy]);

    const handleSearchChange = useCallback((value: string) => {
        setSearchQuery(value);
    }, []);

    const handleRatingChange = useCallback((value: number) => {
        setMinRating(value);
    }, []);

    const handleSortChange = useCallback((value: 'popularity' | 'vote_average') => {
        setSortBy(value);
    }, []);

    return (
        <div className="min-h-screen pt-24 pb-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16 animate-fade-in">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Catalogue</h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Explorez notre collection complète de films. Des classiques aux nouveautés, tout est là.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto mb-12">
                    <SearchBar value={searchQuery} onChange={handleSearchChange} />
                </div>

                <FilterBar
                    minRating={minRating}
                    onMinRatingChange={handleRatingChange}
                    sortBy={sortBy}
                    onSortChange={handleSortChange}
                />

                {error && (
                    <div className="text-center text-red-500 py-8 bg-red-500/10 rounded-xl border border-red-500/20 mb-8">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                        {[...Array(10)].map((_, i) => (
                            <div key={i} className="aspect-[2/3] bg-[#1A1625] rounded-xl animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <>
                        {filteredAndSortedMovies.length === 0 ? (
                            <div className="text-center py-32 text-gray-500">
                                <p className="text-2xl font-bold mb-2">Aucun résultat</p>
                                <p>Essayez de modifier vos critères de recherche.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 animate-slide-up">
                                {filteredAndSortedMovies.map((movie) => (
                                    <MovieCard key={movie.id} movie={movie} />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
