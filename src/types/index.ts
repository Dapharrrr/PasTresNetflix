export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    vote_average: number;
    release_date: string;
    genre_ids: number[];
    popularity: number;
}

export interface MovieDetail extends Movie {
    genres: Genre[];
    runtime: number;
    tagline: string;
    status: string;
}

export interface Genre {
    id: number;
    name: string;
}

export interface ApiResult<T> {
    page: number;
    results: T[];
    total_pages: number;
    total_results: number;
}
