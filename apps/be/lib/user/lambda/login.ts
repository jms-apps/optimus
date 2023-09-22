import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { AppSyncResolverEvent } from 'aws-lambda';
import { QueryLoginArgs } from '../../schema';

export const handler = async (
  event: AppSyncResolverEvent<QueryLoginArgs>
): Promise<any> => {
  const { email, password } = event.arguments;
  const cognito = new CognitoIdentityServiceProvider();

  const authParams: CognitoIdentityServiceProvider.InitiateAuthRequest = {
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: process.env.userPoolClientId as string,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
    },
  };

  const authResponse = await cognito.initiateAuth(authParams).promise();

  return {
    authResponse,
  };
};
