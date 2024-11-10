export interface Movie {
    id: number;
    original_title: string;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    genre_ids?: number[];
    release_date: string;
    vote_average: number;
    vote_count: number;
    adult: boolean;
    video: boolean;
    popularity: number;
    original_language: string;
}

export interface Genre {
    id: number;
    name: string;
}

export interface MovieDetails extends Movie {
    budget: number;
    genres: Genre[];
    tagline: string;
    belongs_to_collection?: {
        id: number;
        name: string;
        poster_path: string;
        backdrop_path: string;
    };
    homepage?: string;
    imdb_id?: string;
    production_companies?: {
        id: number;
        logo_path: string;
        name: string;
        origin_country: string;
    }[];
    production_countries?: {
        iso_3166_1: string;
        name: string;
    }[];
    revenue?: number;
    runtime?: number;
    spoken_languages?: {
        english_name: string;
        iso_639_1: string;
        name: string;
    }[];
}