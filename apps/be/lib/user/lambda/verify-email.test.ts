import { AppSyncResolverEvent } from 'aws-lambda';
import { handler } from './verify-email';
import { MutationVerifyEmailArgs } from '@optimus/common';
import { vi } from 'vitest';

vi.mock('aws-sdk', () => {
  const actual = vi.importActual('aws-sdk');
  return {
    ...actual,
    CognitoIdentityServiceProvider: vi.fn(() => ({
      confirmSignUp: () => ({
        promise: vi.fn().mockReturnThis(),
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
