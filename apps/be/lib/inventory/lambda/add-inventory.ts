import { AppSyncResolverEvent } from 'aws-lambda';
import {
  MutationAddInventoryArgs,
  Inventory,
  isTokenValid,
  errorHandler,
  OptimusError,
} from '@optimus/common';
import { DynamoDB } from 'aws-sdk';
import crypto from 'crypto';

const addInventory = async (
  event: AppSyncResolverEvent<MutationAddInventoryArgs>
): Promise<Inventory> => {
  if (!(await isTokenValid(event.request.headers['x-auth-token'] as string))) {
    throw new OptimusError('Unauthorized');
  }
  const dynamodb = new DynamoDB.DocumentClient();
  const inventory = event.arguments.input;

  if (!inventory?.sku) {
    inventory.sku = crypto.randomBytes(8).toString('hex').substring(0, 8);
  }

  const hasItem = await dynamodb
    .get({
      TableName: process.env.inventoryTableName as string,
      Key: {
        sku: inventory.sku,
      },
    })
    .promise();
  if (hasItem.Item)
    throw new OptimusError(
      `Inventory with sku ${inventory.sku} already exists`
    );
  await dynamodb
    .put({
      TableName: process.env.inventoryTableName as string,
      Item: inventory,
    })
    .promise();
  return inventory;
};

export const handler = errorHandler(addInventory);
