import { CognitoPostConfirmEvent } from "../../lib/cognito/types/CognitoPostConfirmEvent";

export const CREATE_USER_EVENT_MOCK: CognitoPostConfirmEvent = {
  version: "1",
  region: "eu-central-1",
  userPoolId: "eu-central-xxxx",
  userName: "testuser123",
  callerContext: {
    awsSdkVersion: "aws-sdk-unknown-unknown",
    clientId: "clientID",
  },
  triggerSource: "PostConfirmation_ConfirmSignUp",
  request: {
    userAttributes: {
      sub: "uuid",
      "cognito:user_status": "CONFIRMED",
      email_verified: "true",
      "cognito:email_alias": "example@mail.com",
      email: "example@email.com",
    },
  },
  response: {},
};
