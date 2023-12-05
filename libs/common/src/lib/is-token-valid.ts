import { CognitoIdentityServiceProvider } from 'aws-sdk';

export const isTokenValid = async (token: string): Promise<boolean> => {
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

    return true;
  } catch (error) {
    return false;
  }
};
