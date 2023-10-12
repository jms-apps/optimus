import { AppSyncResolverEvent } from 'aws-lambda';
import { handler } from './verify-email';
import { MutationVerifyEmailArgs } from '@optimus/common';

jest.mock('aws-sdk', () => {
  const actual = jest.requireActual('aws-sdk');
  return {
    ...actual,
    CognitoIdentityServiceProvider: jest.fn(() => ({
      confirmSignUp: () => ({
        promise: jest.fn().mockReturnThis(),
      }),
    })),
  };
});

describe('Verify email', () => {
  it('should verify email', async () => {
    const email = 'test@example.com';
    const code = 'code';

    const event = {
      arguments: {
        email,
        code,
      },
    } as AppSyncResolverEvent<MutationVerifyEmailArgs>;

    const result = await handler(event);

    expect(result).toEqual({ email });
  });
});
