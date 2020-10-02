import { HttpHeaders } from "./HttpHeaders";

export interface HttpResponse {
    statusCode: number;
    body: string;
    headers: HttpHeaders;
}
