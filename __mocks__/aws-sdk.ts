const awsSdk = jest.requireActual('aws-sdk');

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
  put: jest.fn().mockReturnThis(),
  promise: jest.fn(),
};
const mockAwsSdk = {
  ...awsSdk,
  DynamoDB: {
    ...awsSdk.DynamoDB,
    DocumentClient: jest.fn(() => mockDocumentClient),
  },
};

export default mockAwsSdk;
