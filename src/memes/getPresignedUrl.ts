import { APIGatewayProxyEvent, ProxyResult } from "aws-lambda";
import { S3 } from "aws-sdk";
import { get, isEmpty } from "lodash";
import { v4 as uuid } from "uuid";

import BadRequest from "../lib/errors/BadRequest";
import { addCorsHeaders } from "../lib/http/middleware/addCorsHeaders";
import { cors } from "../lib/http/middleware/cors";

export async function handler(
    event: APIGatewayProxyEvent
): Promise<ProxyResult> {
    try {
        cors(event);
    } catch (error) {
        return new BadRequest(error);
    }

    const s3Client = new S3();
    const userId = get(event, "requestContext.authorizer.claims.sub", null);
    const contentType = get(event, "queryStringParameters.contentType", null);
    const tags = get(event, "queryStringParameters.tags", null);
    const title = get(event, "queryStringParameters.title", null);

    if (isEmpty(userId)) {
        return new BadRequest({ message: "User ID missing." });
    }

    if (isEmpty(contentType)) {
        return new BadRequest({ message: "Content type missing" });
    }

    if (isEmpty(title)) {
        return new BadRequest({ message: "Title missing." });
    }

    if (isEmpty(tags)) {
        return new BadRequest({ message: "Tags missing." });
    }

    const key = `${userId}/${uuid()}.jpg`;

    const params = {
        Bucket: `memes-pending-${process.env.ENVIRONMENT}`,
        Key: key,
        ContentType: contentType,
    };

    const presignedUrl = await s3Client.getSignedUrlPromise(
        "putObject",
        params
    );

    const response = {
        statusCode: 200,
        body: JSON.stringify({
            presignedUrl,
        }),
    };

    return addCorsHeaders(response);
}
