import { AppSyncResolverEvent } from 'aws-lambda';
import { handler } from './login';
import { MutationRegisterArgs } from '../../schema.auto-generated';

const testAccessToken = 'test-access-token';

jest.mock('aws-sdk', () => {
  const actual = jest.requireActual('aws-sdk');
  return {
    ...actual,
    CognitoIdentityServiceProvider: jest.fn(() => ({
      initiateAuth: () => ({
        promise: () => ({
          AuthenticationResult: {
            AccessToken: testAccessToken,
          },
        }),
      }),
    })),
  };
});

describe('Login', () => {
  it('should register a user', async () => {
    const email = 'test@example.com';
    const password = 'password';

    const event = {
      arguments: {
        email,
        password,
      },
    } as AppSyncResolverEvent<MutationRegisterArgs>;

    const result = await handler(event);

    expect(result).toEqual({ email, token: testAccessToken });
  });
});
