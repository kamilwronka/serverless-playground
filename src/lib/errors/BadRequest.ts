export default class BadRequest {
    body: string;
    statusCode: number;

    constructor(message: any) {
        this.body = JSON.stringify(message);
        this.statusCode = 400;
    }
}
