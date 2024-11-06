export interface Movie {
    id: number;
    original_title: string;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    genre_ids: number[];
    release_date: string;
    vote_average: number;
    vote_count: number;
    adult: boolean;
    video: boolean;
    popularity: number;
    original_language: string;
}