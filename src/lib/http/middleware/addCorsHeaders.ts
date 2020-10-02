import { ProxyResult } from "aws-lambda";

export const addCorsHeaders = (response: ProxyResult): ProxyResult => {
    return {
        ...response,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
        },
    };
};
