import { isEmpty, get } from "lodash";
import { DynamoDB } from "aws-sdk";
import BadRequest from "../lib/errors/BadRequest";

export async function handler(event, context, callback) {
    const dynamoClient = new DynamoDB.DocumentClient();

    let lastItem = get(event, "queryStringParameters.lastItem", null);
    let limit = get(event, "queryStringParameters.limit", "12");

    const params = {
        TableName: `memes-${process.env.ENVIRONMENT}`,
        Select: "ALL_ATTRIBUTES",
        Limit: limit,
    };

    if (lastItem) {
        params["ExclusiveStartKey"] = { id: lastItem };
    }

    try {
        const retrievedData = await dynamoClient.scanAsync(params);
        console.log(retrievedData);

        const response = {
            statusCode: 200,
            body: JSON.stringify(retrievedData),
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
            },
        };

        return response;
    } catch (error) {
        console.log(error);

        return new BadRequest(error);
    }
}
