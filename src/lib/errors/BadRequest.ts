export default class BadRequest {
    body: string;
    statusCode: number;
    headers: any;

    constructor(message: any) {
        this.body = JSON.stringify(message);
        this.statusCode = 400;
        this.headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
        };
    }
}
