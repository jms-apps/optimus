import { AppSyncResolverEvent } from 'aws-lambda';
import { handler } from './register';
import { MutationRegisterArgs } from '@optimus/common';

jest.mock('aws-sdk', () => {
  const actual = jest.requireActual('aws-sdk');
  return {
    ...actual,
    CognitoIdentityServiceProvider: jest.fn(() => ({
      signUp: () => ({ promise: jest.fn().mockReturnThis() }),
    })),
  };
});

describe('Register', () => {
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

    expect(result).toEqual({ email });
  });
});
