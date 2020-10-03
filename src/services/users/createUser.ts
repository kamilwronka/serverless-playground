import { isEmpty } from "lodash";
import { DynamoDB } from "aws-sdk";
import { validateSync } from "class-validator";

import { CognitoPostConfirmEvent } from "../lib/cognito/types/CognitoPostConfirmEvent";
import { User } from "./types/User";

export async function handler(
    event: CognitoPostConfirmEvent
): Promise<CognitoPostConfirmEvent> {
    const dynamoClient = new DynamoDB.DocumentClient();

    const userId = event.request.userAttributes.sub;
    const email = event.request.userAttributes.email;
    const username = event.userName;

    const user = new User({ username, id: userId, email });
    const validation = validateSync(user, {
        validationError: { target: false, value: false },
    });

    if (!isEmpty(validation)) {
        throw new Error(JSON.stringify(validation));
    }

    const params: DynamoDB.DocumentClient.PutItemInput = {
        TableName: `users-${process.env.ENVIRONMENT}`,
        Item: {
            id: user.id,
            email: user.email,
            profilePicture: user.profilePicture,
            username: user.username,
        },
    };

    try {
        await dynamoClient.put(params).promise();
    } catch (error) {
        console.log(error);
        throw error;
    }

    return event;
}