import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { APIGatewayProxyResult, AppSyncResolverEvent } from 'aws-lambda';
import { RegisterInput } from '../../schema';

export const handler = async (
  event: AppSyncResolverEvent<RegisterInput>
): Promise<APIGatewayProxyResult> => {
  try {
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
      statusCode: 200,
      body: JSON.stringify({ message: 'User registered successfully' }),
    };
  } catch (error) {
    // Handle any errors and return an error response
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error }),
    };
  }
};
