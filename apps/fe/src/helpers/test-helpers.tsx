import { render } from '@testing-library/react';
import { App } from '../app';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { routesConfig } from '../routes';

interface RenderWithRouterOptionalParams {
  withLogin?: true;
}

export const renderWithRouter = (
  route = '/',
  { withLogin }: RenderWithRouterOptionalParams = {}
) => {
  if (withLogin) localStorage.setItem('token', 'valid-token');
  const router = createMemoryRouter(routesConfig, {
    initialEntries: [route],
  });
  render(
    <App>
      <RouterProvider router={router} />
    </App>
  );
  window.history.pushState({}, 'Test page', route);
};
