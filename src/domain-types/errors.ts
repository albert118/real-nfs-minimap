export class GlobalError extends Error {
    readonly error: Error;

    constructor(error: Error) {
        super(error.message);
        this.error = error;
    }
}
