import { AppSyncResolverEvent } from 'aws-lambda';
import crypto from 'crypto';
import { OptimusError } from './optimus-error';
import { isTokenValid } from './is-token-valid';

type AppSyncHandler<T, U> = (event: AppSyncResolverEvent<T>) => Promise<U>;

export const errorHandler = <T, U>(
  originalFunction: AppSyncHandler<T, U>,
  shouldAuthorize = true
): AppSyncHandler<T, U> => {
  return async (event: AppSyncResolverEvent<T>): Promise<U> => {
    try {
      if (shouldAuthorize) {
        if (
          !(await isTokenValid(event.request.headers['x-auth-token'] as string))
        ) {
          throw new OptimusError('Unauthorized');
        }
      }
      return await originalFunction(event);
    } catch (error) {
      if (error instanceof OptimusError) {
        throw error;
      }
      const code = crypto.randomBytes(8).toString('hex');
      console.error({ error, code, event: JSON.stringify(event) });
      throw new Error(
        `An error occurred while processing the request, errorCode: ${code}`
      );
    }
  };
};
