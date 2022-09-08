export type HTTPErrorTuple = [statusCode: number, message: string];

export type ErrorSet<Key extends string | number | symbol> = { [key in Key]: HTTPErrorTuple };

export class HTTPError extends Error {
    message: string;
    tuple: HTTPErrorTuple;

    constructor(error: HTTPErrorTuple) {
        super(error[1]);
        this.tuple = error;
    }
}
