import Hero from '@/components/Hero';
import MovieCard from '@/components/MovieCard';
import { getPopularMovies } from '@/lib/tmdb';
import Link from 'next/link';

export default async function Home() {
  const popularMoviesData = await getPopularMovies();
  const popularMovies = popularMoviesData.results.slice(0, 6);

  return (
    <div className="flex flex-col gap-32 pb-32 bg-[#0F0A1F]">
      {/* Hero Section */}
      <Hero />

      {/* Why Us Section */}
      <section className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Pourquoi choisir <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">PasNetflix</span> ?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">Une expérience conçue pour les vrais amateurs de cinéma.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Ultra Rapide",
              description: "Streaming instantané sans mise en mémoire tampon.",
              icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              )
            },
            {
              title: "4K HDR",
              description: "Une qualité d'image époustouflante sur tous vos écrans.",
              icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )
            },
            {
              title: "Immersion Totale",
              description: "Interface sombre et épurée pour une concentration maximale.",
              icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              )
            }
          ].map((item, index) => (
            <div key={index} className="glass-panel p-8 rounded-2xl hover:bg-purple-900/10 transition-colors group cursor-default border border-purple-500/10 hover:border-purple-500/30">
              <div className="text-purple-400 mb-4 group-hover:scale-110 group-hover:text-purple-300 transition-all duration-300 inline-block bg-purple-500/10 p-4 rounded-xl">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Movies Section */}
      <section className="container mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-purple-400 font-bold tracking-wider uppercase text-sm mb-2 block">Tendances</span>
            <h2 className="text-3xl md:text-4xl font-bold">Films Populaires</h2>
          </div>
          <Link href="/movies" className="text-gray-400 hover:text-purple-400 font-medium transition-colors flex items-center gap-2 group">
            Voir tout
            <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {popularMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6">
        <div className="relative rounded-3xl p-12 md:p-24 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-500 opacity-90" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />

          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white">Prêt à vivre l'expérience ?</h2>
            <p className="text-xl md:text-2xl text-white/90 mb-12 font-light">
              Rejoignez PasNetflix dès aujourd'hui. Annulable à tout moment.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link
                href="/movies"
                className="px-10 py-5 bg-white text-purple-600 font-bold text-lg rounded-lg hover:bg-gray-100 transition-colors shadow-2xl"
              >
                Commencer maintenant
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
