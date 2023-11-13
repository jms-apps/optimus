import '@testing-library/jest-dom';
import { server } from './src/mocks/server';

beforeAll(() => {
  return server.listen();
});

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
