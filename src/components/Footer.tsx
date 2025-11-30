export default function Footer() {
    return (
        <footer className="bg-black border-t border-white/10 py-8 mt-auto">
            <div className="container mx-auto px-4 text-center">
                <p className="text-gray-400 text-sm">
                    &copy; {new Date().getFullYear()} PasNetflix. Fait avec <span className="text-red-500">♥</span> pour le cours de Web.
                </p>
                <p className="text-gray-600 text-xs mt-2">
                    Données fournies par TMDb. Ce produit utilise l'API TMDb mais n'est ni approuvé ni certifié par TMDb.
                </p>
            </div>
        </footer>
    );
}
