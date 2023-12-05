import { AppSyncResolverEvent } from 'aws-lambda';
import crypto from 'crypto';
import { OptimusError } from './optimus-error';

type AppSyncHandler<T, U> = (event: AppSyncResolverEvent<T>) => Promise<U>;

export const errorHandler = <T, U>(
  originalFunction: AppSyncHandler<T, U>
): AppSyncHandler<T, U> => {
  return async (event: AppSyncResolverEvent<T>): Promise<U> => {
    try {
      return await originalFunction(event);
    } catch (error) {
      if (error instanceof OptimusError) {
        throw error;
      }
      const code = crypto.randomBytes(8).toString('hex');
      console.error({ error, code, event });
      throw new Error(
        `An error occurred while processing the request, errorCode: ${code}`
      );
    }
  };
};
