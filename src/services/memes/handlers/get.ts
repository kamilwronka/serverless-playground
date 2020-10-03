import { APIGatewayEvent, ProxyResult } from "aws-lambda";
import { DynamoDB } from "aws-sdk";
import { get } from "lodash";

import BadRequest from "../../../lib/errors/BadRequest";
import { addCorsHeaders } from "../../../lib/http/middleware/addCorsHeaders";
import { cors } from "../../../lib/http/middleware/cors";

export async function handler(event: APIGatewayEvent): Promise<ProxyResult> {
  try {
    cors(event);
  } catch (error) {
    return new BadRequest(error);
  }

  const dynamoClient = new DynamoDB.DocumentClient();

  const lastItem = get(event, "queryStringParameters.lastItem", null);
  const limit = get(event, "queryStringParameters.limit", "12");

  const params = {
    TableName: `memes-${process.env.ENVIRONMENT}`,
    Select: "ALL_ATTRIBUTES",
    Limit: limit,
  };

  if (lastItem) {
    params["ExclusiveStartKey"] = { id: lastItem };
  }

  try {
    const retrievedData = await dynamoClient.scan(params).promise();

    const response = {
      statusCode: 200,
      body: JSON.stringify(retrievedData),
    };

    return addCorsHeaders(response);
  } catch (error) {
    return new BadRequest(error);
  }
}
