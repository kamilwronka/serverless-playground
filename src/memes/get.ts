import { DynamoDB, config } from "aws-sdk";

export function handler(event, context, callback) {
  const dynamoClient = new DynamoDB.DocumentClient();
  const params = {
    TableName: "memes",
    Select: "ALL_ATTRIBUTES",
  };

  dynamoClient.scan(params, function (err, data) {
    if (err) {
      const response = {
        statusCode: 400,
        body: JSON.stringify(err),
        headers: {
          "Access-Control-Allow-Origin": "*", // Required for CORS support to work
          "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
        },
      };
      return callback(err, response);
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: {
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
      },
    };

    callback(null, response);
  });
}
