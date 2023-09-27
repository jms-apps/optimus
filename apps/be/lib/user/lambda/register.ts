import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { AppSyncResolverEvent } from 'aws-lambda';
import { MutationRegisterArgs, User } from '../../schema.auto-generated';

export const handler = async (
  event: AppSyncResolverEvent<MutationRegisterArgs>
): Promise<User> => {
  const { password, email } = event.arguments;

  // Initialize the AWS Cognito Identity Service Provider
  const cognito = new CognitoIdentityServiceProvider();

  // Define parameters for the user registration request
  const registrationParams = {
    ClientId: process.env.userPoolClientId as string,
    Password: password,
    Username: email,
    UserAttributes: [
      {
        Name: 'email',
        Value: email,
      },
    ],
  };

  // Initiate the user registration request
  await cognito.signUp(registrationParams).promise();

  // Return a success message
  return {
    email,
  };
};
