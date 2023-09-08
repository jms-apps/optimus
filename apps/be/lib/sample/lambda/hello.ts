export const handler = async (event: any): Promise<any> => {
  try {
    // Your Lambda function logic here
    const response = {
      statusCode: 200,
      body: JSON.stringify('Hello, World!'),
    };
    return response;
  } catch (error) {
    console.error('Error:', error);
    const response = {
      statusCode: 500,
      body: JSON.stringify('Internal Server Error'),
    };
    return response;
  }
};
