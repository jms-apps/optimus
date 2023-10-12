import * as ReactDOM from 'react-dom/client';
import { App } from './app';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <App>
    <RouterProvider router={router} />
  </App>
);
