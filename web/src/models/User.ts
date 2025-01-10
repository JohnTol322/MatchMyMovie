export type User = {
    id?: number;
    username: string;
    email: string;
    isOnboarded?: boolean;
    favoriteMovieId?: number;
    favoriteGenreIds?: number[];
    watchProviderIds?: number[];
    password?: string;
    createdAt?: string;
}