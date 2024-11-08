export default class AuthError extends Error {
    public status: number;

    constructor(message: string) {
        super(message);
        this.status = 403;
    }
}