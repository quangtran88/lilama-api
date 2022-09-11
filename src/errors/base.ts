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

export class ValidationError extends Error {
    fieldPath: string;
    issue: string;

    constructor(message: string, fieldPath: string, issue: string) {
        super(message);
        this.fieldPath = fieldPath;
        this.issue = issue;
    }
}

export class UploadError extends Error {
    constructor(message: string, lineNumber: number) {
        super(`Error when processing line [${lineNumber}]: ${message}`);
    }
}
