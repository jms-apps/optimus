import { handler as addInventoryHandler } from './add-inventory';
import { MutationAddInventoryArgs } from '@optimus/common';
import { AppSyncResolverEvent } from 'aws-lambda';

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
    } as unknown as AppSyncResolverEvent<MutationAddInventoryArgs>);
    expect(result).toEqual({
      name: 'test',
      quantity: 1,
      price: 1,
      sku: expect.any(String),
    });
  });
});
