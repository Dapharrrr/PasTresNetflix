'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0F0A1F]/95 backdrop-blur-md shadow-lg shadow-purple-900/20 py-3' : 'bg-[#0F0A1F]/50 backdrop-blur-sm py-5'
            }`}>
            <div className="container mx-auto px-6 flex items-center justify-between">
                <Link href="/" className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 tracking-tighter hover:scale-105 transition-transform">
                    PasNetflix
                </Link>

                <div className="flex items-center gap-6 md:gap-8">
                    <Link href="/" className="text-sm md:text-base font-medium text-gray-200 hover:text-purple-400 transition-colors relative group">
                        Accueil
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full"></span>
                    </Link>
                    <Link href="/movies" className="text-sm md:text-base font-medium text-gray-200 hover:text-purple-400 transition-colors relative group">
                        Catalogue
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full"></span>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
