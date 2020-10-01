import { DynamoDB } from "aws-sdk";

export async function handler(event) {
  const dynamoClient = new DynamoDB.DocumentClient();

  const userId = event.request.userAttributes.sub;

  const params: DynamoDB.DocumentClient.GetItemInput = {
    TableName: `users-${process.env.ENVIRONMENT}`,
    Key: { id: userId },
  };

  try {
    const dynamoDBResponse: DynamoDB.DocumentClient.GetItemOutput = await dynamoClient
      .get(params)
      .promise();

    const response = {
      statusCode: 200,
      body: JSON.stringify(dynamoDBResponse.Item),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    };

    return response;
  } catch (error) {
    console.log(error);
    return {
      statusCode: 400,
      error: JSON.stringify(error),
    };
  }
}
