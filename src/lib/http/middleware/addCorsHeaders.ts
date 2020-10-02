import { ProxyResult } from "aws-lambda";

export const addCorsHeaders = (response: ProxyResult): ProxyResult => {
    const corsOrigins = process.env.CORS_ORIGINS;

    return {
        ...response,
        headers: {
            "Access-Control-Allow-Origin": corsOrigins ? corsOrigins : "",
            "Access-Control-Allow-Credentials": true,
        },
    };
};
