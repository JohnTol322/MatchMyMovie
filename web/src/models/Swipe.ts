export default interface Swipe {
    id?: number;
    userId?: number;
    movieId: number;
    liked: boolean;
    genreIds?: number[];
    createdOn?: Date;
}