export interface CognitoPostConfirmEvent {
  version: string;
  region: string;
  userPoolId: string;
  userName: string;
  callerContext: CognitoPostConfirmEventCallerContext;
  triggerSource: string;
  request: CognitoPostConfirmEventRequest;
  response: any;
}

export interface CognitoPostConfirmEventCallerContext {
  awsSdkVersion: string;
  clientId: string;
}

export interface CognitoPostConfirmEventRequest {
  userAttributes: {
    sub: string;
    "cognito:user_status": string;
    email_verified: string;
    "cognito:email_alias": string;
    email: string;
  };
}
