import { get } from "lodash";
import { DynamoDB } from "aws-sdk";

export async function handler(event, context, callback) {
  const dynamoClient = new DynamoDB.DocumentClient();

  //   const params: DynamoDB.PutItemInput = {
  //     TableName: `users-${process.env.ENVIRONMENT}`,
  //     Item: { id: }
  //   };

  //   try {
  //     const retrievedData = await dynamoClient.scan(params).promise();

  //     const response = {
  //       statusCode: 200,
  //       body: JSON.stringify(retrievedData),
  //       headers: {
  //         "Access-Control-Allow-Origin": "*",
  //         "Access-Control-Allow-Credentials": true,
  //       },
  //     };

  //     return response;
  //   } catch (error) {
  //     console.log(error);

  //     return new BadRequest(error);
  //   }

  console.log(JSON.stringify(event));

  return {
    statusCode: 200,
    body: JSON.stringify(event),
  };
}
