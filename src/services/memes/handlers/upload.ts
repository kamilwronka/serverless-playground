import { APIGatewayProxyEvent, ProxyResult } from "aws-lambda";
import { DynamoDB } from "aws-sdk";
import { plainToClass } from "class-transformer";
import { validateSync } from "class-validator";
import { get, isEmpty } from "lodash";
import { v4 as uuid } from "uuid";

import BadRequest from "../../../lib/errors/BadRequest";
import { cors } from "../../../lib/http/middleware/cors";
import { CreateMemeRequestBody } from "../types/CreateMemeRequestBody";
import { MemePending } from "../types/MemePending";

export async function handler(
  event: APIGatewayProxyEvent
): Promise<ProxyResult> {
  try {
    cors(event);
  } catch (error) {
    return new BadRequest(error);
  }

  if (!event.body) {
    return new BadRequest({ message: "Missing request body." });
  }

  const dynamoClient = new DynamoDB.DocumentClient();
  const userId = get(event, "requestContext.authorizer.claims.sub", null);
  const objectId = uuid();

  let body;
  if (event.body) {
    body = JSON.parse(event.body);
  }

  const parsedBody = plainToClass(CreateMemeRequestBody, body);
  const validation = validateSync(parsedBody, {
    validationError: { target: false, value: false },
  });

  if (!isEmpty(validation)) {
    return new BadRequest(validation);
  }

  const meme = new MemePending({
    id: objectId,
    userId,
    url: parsedBody.url,
    title: parsedBody.title,
    tags: parsedBody.tags,
  });

  const params = {
    TableName: `memes-pending-${process.env.ENVIRONMENT}`,
    Item: meme,
  };

  try {
    await dynamoClient.put(params).promise();

    const response: ProxyResult = {
      statusCode: 201,
      body: JSON.stringify({ message: "Created" }),
    };

    return response;
  } catch (error) {
    return new BadRequest(error);
  }
}
