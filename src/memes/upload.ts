import { S3, DynamoDB } from "aws-sdk";
import { get } from "lodash";
import { v4 as uuid } from "uuid";

export async function getPresignedUrl(event, context, callback) {
  const s3Client = new S3();
  const userId = get(event, "requestContext.authorizer.claims.sub", "testID");

  const key = `${userId}/${uuid()}.jpg`;

  const params = {
    Bucket: "memes-bucket",
    Key: key,
    ContentType: "image/jpeg",
  };

  const presignedUrl = await s3Client.getSignedUrlPromise("putObject", params);

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      presignedUrl,
    }),
    headers: {
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
    },
  };

  callback(null, response);
}

export function uploadHandler(event, context, callback) {
  const dynamoClient = new DynamoDB.DocumentClient();
  const userId = get(event, "requestContext.authorizer.claims.sub", "testID");
  const body = JSON.parse(event.body);

  const objectId = uuid();

  const params = {
    TableName: "memes",
    Item: { id: objectId, userId, url: body.url, title: body.title },
  };

  dynamoClient.put(params, function (err, data) {
    if (err) {
      callback(err);
    }

    const response = {
      statusCode: 201,
      body: JSON.stringify({
        data,
      }),
      headers: {
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
      },
    };

    callback(null, response);
  });
}
