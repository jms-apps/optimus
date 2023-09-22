import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { AppSyncResolverEvent, Handler } from 'aws-lambda';
import { VerifyEmailInput } from '../../schema';

export const handler: Handler = async (
  event: AppSyncResolverEvent<VerifyEmailInput>
) => {
  try {
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
      statusCode: 200,
      body: JSON.stringify({ message: 'Email verification successful' }),
    };
  } catch (error) {
    // Handle errors and return an error response
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error }),
    };
  }
};
