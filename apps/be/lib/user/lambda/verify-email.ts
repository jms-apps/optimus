import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { AppSyncResolverEvent, Handler } from 'aws-lambda';
import { MutationVerifyEmailArgs } from '../../schema.auto-generated';

export const handler: Handler = async (
  event: AppSyncResolverEvent<MutationVerifyEmailArgs>
) => {
  // Initialize AWS Cognito Identity Service Provider
  const cognito = new CognitoIdentityServiceProvider();

  // Extract user information from the event
  const { email, code } = event.arguments;

  // Call the Cognito API to verify the user's email
  await cognito
    .confirmSignUp({
      ClientId: process.env.userPoolClientId as string,
      Username: email,
      ConfirmationCode: code,
    })
    .promise();

  // Verification successful
  return {
    email,
  };
};
