'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Movie } from '@/types';
import { getImageUrl } from '@/lib/tmdb';
import { useFavorites } from '@/hooks/useFavorites';
import { MouseEvent } from 'react';

interface MovieCardProps {
    movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
    const { isFavorite, toggleFavorite } = useFavorites();
    const favorite = isFavorite(movie.id);

    const handleFavoriteClick = (e: MouseEvent) => {
        e.preventDefault();
        toggleFavorite(movie.id);
    };

    return (
        <Link href={`/movies/${movie.id}`} className="group relative block aspect-[2/3] rounded-xl overflow-hidden bg-[#1A1625] transition-all duration-300 hover:z-10 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30">
            <Image
                src={getImageUrl(movie.poster_path)}
                alt={movie.title}
                fill
                className="object-cover transition-transform duration-300"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

            <button
                onClick={handleFavoriteClick}
                className="absolute top-2 right-2 z-20 p-1.5 rounded-full bg-black/60 backdrop-blur-md hover:bg-purple-600 hover:text-white text-white transition-all opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
            >
                <svg
                    className={`w-4 h-4 ${favorite ? 'text-purple-500 fill-current' : 'fill-none'}`}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            </button>

            <div className="absolute bottom-0 left-0 right-0 p-3">
                <h3 className="text-white font-bold text-sm leading-tight mb-1 line-clamp-1 drop-shadow-md">{movie.title}</h3>
                <div className="flex items-center justify-between text-[10px] text-gray-300">
                    <span className="text-purple-300 font-semibold">{Math.round(movie.vote_average * 10)}%</span>
                    <span>{new Date(movie.release_date).getFullYear()}</span>
                </div>
            </div>
        </Link>
    );
}
