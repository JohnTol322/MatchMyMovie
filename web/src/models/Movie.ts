export interface Movie {
    id: number;
    originalTitle: string;
    title: string;
    overview: string;
    posterPath: string;
    backdropPath: string;
    genreIds: number[];
    releaseDate: string;
    voteAverage: number;
    voteCount: number;
    adult: boolean;
    video: boolean;
    popularity: number;
    originalLanguage: string;
}