import { request, Variables } from 'graphql-request';

export async function optimusRequest<T>(query: string, variables: Variables) {
  const headers = {
    'x-api-key': 'da2-5hzzedte4bd4jdzqv4e77v4moa',
  };
  const data = await request<T>(
    'https://dev-api.sujanashah.com/graphql',
    query,
    variables,
    headers
  );

  return data;
}
