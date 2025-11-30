import { getMovieDetails, getImageUrl } from '@/lib/tmdb';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function MovieDetailPage({ params }: PageProps) {
    const { id } = await params;

    try {
        const movie = await getMovieDetails(parseInt(id));

        return (
            <div className="relative min-h-screen bg-[#0F0A1F]">
                {/* Massive Backdrop */}
                <div className="absolute inset-0 h-[80vh] z-0">
                    <Image
                        src={getImageUrl(movie.backdrop_path, 'original')}
                        alt={movie.title}
                        fill
                        className="object-cover opacity-40"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0F0A1F]/10 via-[#0F0A1F]/80 to-[#0F0A1F]" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0F0A1F] via-transparent to-transparent" />
                </div>

                <div className="relative z-10 container mx-auto px-6 pt-32 pb-20">
                    <Link
                        href="/movies"
                        className="inline-flex items-center text-gray-300 hover:text-white mb-12 transition-colors group bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10"
                    >
                        <span className="mr-2 transform group-hover:-translate-x-1 transition-transform">&larr;</span>
                        Retour au catalogue
                    </Link>

                    <div className="flex flex-col lg:flex-row gap-16 items-start">
                        {/* Poster with Reflection */}
                        <div className="flex-shrink-0 w-full md:w-[350px] lg:w-[400px] relative group">
                            <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10">
                                <Image
                                    src={getImageUrl(movie.poster_path)}
                                    alt={movie.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        {/* Details */}
                        <div className="flex-grow pt-4 animate-slide-up">
                            <h1 className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight tracking-tight">{movie.title}</h1>

                            {movie.tagline && (
                                <p className="text-2xl text-gray-300 italic mb-8 font-light border-l-4 border-purple-500 pl-4">
                                    "{movie.tagline}"
                                </p>
                            )}

                            <div className="flex flex-wrap items-center gap-6 mb-10 text-sm md:text-base">
                                <div className="flex items-center gap-2 text-[#46d369] font-bold text-xl bg-[#46d369]/10 px-3 py-1 rounded-md border border-[#46d369]/20">
                                    {Math.round(movie.vote_average * 10)}% Recommandé
                                </div>
                                <div className="text-gray-300 font-medium">
                                    {new Date(movie.release_date).getFullYear()}
                                </div>
                                <div className="text-gray-300 font-medium">
                                    {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                                </div>
                                <div className="flex gap-2">
                                    {movie.genres.map(g => (
                                        <span key={g.id} className="px-3 py-1 bg-white/10 hover:bg-white/20 transition-colors rounded-full text-xs md:text-sm border border-white/10">
                                            {g.name}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-10 max-w-3xl">
                                <h2 className="text-2xl font-bold mb-4 text-white">Synopsis</h2>
                                <p className="text-gray-300 leading-relaxed text-lg">
                                    {movie.overview}
                                </p>
                            </div>

                            <div className="flex gap-6">
                                <button className="px-10 py-4 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-bold rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-purple-500/50 flex items-center gap-3">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                    Lecture
                                </button>
                                <button className="px-10 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold rounded-md transition-all border border-white/20 flex items-center gap-3">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                                    Ma Liste
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error("Failed to fetch movie details", error);
        notFound();
    }
}
