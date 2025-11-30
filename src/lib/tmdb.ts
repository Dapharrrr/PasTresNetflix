import { ApiResult, Movie, MovieDetail } from '@/types';

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_READ_ACCESS_KEY;
const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;

if (!TMDB_API_KEY || !TMDB_BASE_URL) {
    console.error("Missing TMDb API Key or Base URL in environment variables");
}

const fetchFromTmdb = async <T>(endpoint: string, params: Record<string, string> = {}): Promise<T> => {
    const url = new URL(`${TMDB_BASE_URL}${endpoint}`);

    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${TMDB_API_KEY}`
        }
    };

    try {
        const response = await fetch(url.toString(), options);

        if (!response.ok) {
            throw new Error(`TMDb API Error: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Failed to fetch from TMDb:", error);
        throw error;
    }
};

export const getPopularMovies = async (page: number = 1): Promise<ApiResult<Movie>> => {
    return fetchFromTmdb<ApiResult<Movie>>('/movie/popular', { page: page.toString() });
};

export const searchMovies = async (query: string, page: number = 1): Promise<ApiResult<Movie>> => {
    return fetchFromTmdb<ApiResult<Movie>>('/search/movie', { query, page: page.toString() });
};

export const getMovieDetails = async (id: number): Promise<MovieDetail> => {
    return fetchFromTmdb<MovieDetail>(`/movie/${id}`);
};

export const getMovieCredits = async (id: number) => {
    return fetchFromTmdb(`/movie/${id}/credits`);
}

export const getImageUrl = (path: string | null, size: 'w500' | 'original' = 'w500') => {
    if (!path) return '/placeholder-movie.png';
    return `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/${size}${path}`;
}
