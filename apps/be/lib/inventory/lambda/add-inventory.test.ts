import { handler as addInventoryHandler } from './add-inventory';
import { MutationAddInventoryArgs } from '@optimus/common';
import { AppSyncResolverEvent } from 'aws-lambda';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { vi } from 'vitest';

const mockDocumentClient = {
  get: ({ TableName, Key: { sku } }) => {
    if (sku === 'already-exists-sku') {
      return {
        promise: () => Promise.resolve({ Item: { sku } }),
      };
    }
    return {
      promise: () => Promise.resolve({}),
    };
  },
  put: vi.fn().mockReturnThis(),
  promise: vi.fn(),
};

vi.mock('aws-sdk', () => {
  const actual = vi.importActual('aws-sdk');
  return {
    ...actual,
    DynamoDB: {
      ...actual.DynamoDB,
      DocumentClient: vi.fn(() => mockDocumentClient),
    },
    CognitoIdentityServiceProvider: vi.fn(() => ({
      getUser: ({
        AccessToken,
      }: CognitoIdentityServiceProvider.GetUserRequest) => ({
        promise: () => {
          if (AccessToken === 'invalid-token')
            throw new Error('Token is not valid');
        },
      }),
    })),
  };
});

describe('addInventoryHandler', () => {
  it('should return an inventory item if adding is successful', async () => {
    const result = await addInventoryHandler({
      arguments: {
        input: {
          name: 'test',
          quantity: 1,
          price: 1,
        },
      },
      request: {
        headers: {
          'x-auth-token': 'valid-token',
        },
      },
    } as unknown as AppSyncResolverEvent<MutationAddInventoryArgs>);
    expect(result).toEqual({
      name: 'test',
      quantity: 1,
      price: 1,
      sku: expect.any(String),
    });
  });
});

//
