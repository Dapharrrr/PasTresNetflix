interface FilterBarProps {
    minRating: number;
    onMinRatingChange: (rating: number) => void;
    sortBy: 'popularity' | 'vote_average';
    onSortChange: (sort: 'popularity' | 'vote_average') => void;
}

export default function FilterBar({ minRating, onMinRatingChange, sortBy, onSortChange }: FilterBarProps) {
    return (
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-12 p-6 glass-panel rounded-xl">
            <div className="flex items-center gap-4 w-full md:w-auto">
                <label className="text-sm text-gray-400 font-medium whitespace-nowrap">Note minimum</label>
                <div className="flex items-center gap-3 flex-grow">
                    <input
                        type="range"
                        min="0"
                        max="10"
                        step="1"
                        value={minRating}
                        onChange={(e) => onMinRatingChange(Number(e.target.value))}
                        className="w-full md:w-48 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                    />
                    <span className="text-white font-bold min-w-[3ch]">{minRating}</span>
                    <span className="text-purple-400">★</span>
                </div>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
                <label className="text-sm text-gray-400 font-medium whitespace-nowrap">Trier par</label>
                <div className="relative">
                    <select
                        value={sortBy}
                        onChange={(e) => onSortChange(e.target.value as 'popularity' | 'vote_average')}
                        className="bg-[#1A1625] border border-purple-500/30 text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 pr-8 appearance-none cursor-pointer hover:bg-[#1f1a2d] transition-colors"
                    >
                        <option value="popularity">Popularité</option>
                        <option value="vote_average">Note</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-purple-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                </div>
            </div>
        </div>
    );
}
