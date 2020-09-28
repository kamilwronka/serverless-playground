import { DynamoDB, config } from "aws-sdk";
import { isEmpty, get } from "lodash";

export function handler(event, context, callback) {
  const dynamoClient = new DynamoDB.DocumentClient();

  let lastItem = get(event, "queryStringParameters.lastItem", null);
  let limit = get(event, "queryStringParameters.limit", "12");

  const params = {
    TableName: "memes",
    Select: "ALL_ATTRIBUTES",
    Limit: limit,
  };

  if (lastItem) {
    params["ExclusiveStartKey"] = { id: lastItem };
  }

  console.log(params);

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
