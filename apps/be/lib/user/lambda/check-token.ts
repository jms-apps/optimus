import { AppSyncResolverEvent } from 'aws-lambda';
import { TokenValidity, MutationCheckTokenArgs } from '@optimus/common';
import { CognitoIdentityServiceProvider } from 'aws-sdk';

export const handler = async (
  event: AppSyncResolverEvent<MutationCheckTokenArgs>
): Promise<TokenValidity> => {
  const token = event.arguments.token;

  if (!token) {
    throw new Error('Token is not provided');
  }

  const cognito = new CognitoIdentityServiceProvider();
  try {
    await cognito
      .getUser({
        AccessToken: token,
      })
      .promise();

    return { isValid: true };
  } catch (error) {
    return { isValid: false };
  }
};
