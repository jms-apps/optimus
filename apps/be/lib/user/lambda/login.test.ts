import { AppSyncResolverEvent } from 'aws-lambda';
import { handler } from './login';
import { MutationRegisterArgs } from '@optimus/common';
import { vi } from 'vitest';

const testAccessToken = 'test-access-token';

vi.mock('aws-sdk', () => {
  const actual = vi.importActual('aws-sdk');
  return {
    ...actual,
    CognitoIdentityServiceProvider: vi.fn(() => ({
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
