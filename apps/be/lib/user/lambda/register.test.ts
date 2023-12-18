import { AppSyncResolverEvent } from 'aws-lambda';
import { handler } from './register';
import { MutationRegisterArgs } from '@optimus/common';
import { vi } from 'vitest';

vi.mock('aws-sdk', () => {
  const actual = vi.importActual('aws-sdk');
  return {
    ...actual,
    CognitoIdentityServiceProvider: vi.fn(() => ({
      signUp: () => ({ promise: vi.fn().mockReturnThis() }),
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
