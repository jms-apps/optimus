import { handler } from './check-token';
import { AppSyncResolverEvent } from 'aws-lambda';
import { MutationCheckTokenArgs } from '@optimus/common';

jest.mock('aws-sdk', () => {
  const actual = jest.requireActual('aws-sdk');
  return {
    ...actual,
    CognitoIdentityServiceProvider: jest.fn(() => ({
      getUser: ({ AccessToken }: any) => ({
        promise: () => {
          if (AccessToken === 'invalid-token')
            throw new Error('Token is not valid');
        },
      }),
    })),
  };
});

describe('Check Token handler', () => {
  it('should return isValid: true when token is valid', async () => {
    const event = {
      arguments: {
        token: 'valid-token',
      },
    } as AppSyncResolverEvent<MutationCheckTokenArgs>;

    const result = await handler(event);
    expect(result).toEqual({ isValid: true });
  });

  it('should return isValid: false when token is invalid', async () => {
    const event = {
      arguments: {
        token: 'invalid-token',
      },
    } as AppSyncResolverEvent<MutationCheckTokenArgs>;

    const result = await handler(event);
    expect(result).toEqual({ isValid: false });
  });
});
