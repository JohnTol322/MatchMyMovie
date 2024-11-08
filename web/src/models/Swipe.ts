export default interface Swipe {
    id?: number;
    userId?: number;
    movieId: number;
    liked: boolean;
    createdOn?: Date;
}