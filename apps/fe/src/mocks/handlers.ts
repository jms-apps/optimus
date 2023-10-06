// src/mocks/handlers.js
import { graphql } from 'msw';

export const VALID_TOKEN_VALUE = 'test-token';

export const handlers = [
  graphql.mutation('AddInventory', (req, res, ctx) => {
    return res(
      ctx.data({
        addInventory: {
          sku: 'your-sku-value', // Set the desired SKU value
        },
      })
    );
  }),
  graphql.mutation('Login', (req, res, ctx) => {
    return res(
      ctx.data({
        login: {
          token: VALID_TOKEN_VALUE, // Set the desired SKU value
        },
      })
    );
  }),
  // graphql.post('https://dev-api.sujanashah.com/graphql', (req, res, ctx) => {
  //   // `userId` value becomes "abc-123"
  //   console.log('setting as rest');
  // }),

  // Handles a "GetUserInfo" query
  //   graphql.query('addInventory', null),
];
