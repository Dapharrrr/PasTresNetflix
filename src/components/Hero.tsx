'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
    return (
        <div className="relative h-screen w-full flex items-center justify-start overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://image.tmdb.org/t/p/original/uDgy6hyPd82kOHh6I95FLtLnj6p.jpg" // The Last of Us backdrop
                    alt="Hero Background"
                    fill
                    className="object-cover"
                    priority
                    onError={(e) => {
                        // Fallback if image fails (though next/image handles this differently, we just provide a good default)
                        // This is just a comment, actual fallback handling would be in the component logic or using a blur placeholder
                    }}
                />
                {/* Purple Vignette */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0F0A1F] via-[#0F0A1F]/80 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0A1F] via-purple-950/40 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-6 flex flex-col justify-center h-full pt-20">
                <div className="max-w-3xl animate-slide-up">
                    <span className="inline-block px-3 py-1 mb-4 text-xs md:text-sm font-bold tracking-wider text-white uppercase bg-purple-600/80 backdrop-blur-sm rounded-full border border-purple-400/30">
                        Nouveauté
                    </span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 md:mb-6 leading-tight text-white drop-shadow-2xl">
                        Le cinéma,<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-200">
                            sans limite.
                        </span>
                    </h1>
                    <p className="text-base md:text-lg text-gray-200 mb-8 leading-relaxed max-w-xl drop-shadow-lg bg-black/30 p-4 rounded-xl backdrop-blur-sm border border-white/5">
                        Découvrez des milliers de films, des classiques intemporels aux dernières sorties.
                        Une expérience immersive conçue pour les passionnés.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                            href="/movies"
                            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-bold rounded-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-purple-500/50"
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                            Voir le catalogue
                        </Link>
                        <button className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold rounded-lg transition-all border border-purple-500/30 flex items-center justify-center gap-2">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            Plus d'infos
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
