import { createBrowserRouter, Link } from 'react-router-dom';
import { MyInventory } from './pages/myinventory';
import { Login } from './pages/login';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div>
        <h1>Hello World</h1>
        <Link to="about">About Us</Link>
      </div>
    ),
  },
  {
    path: 'my-inventory',
    element: <MyInventory />,
  },
  {
    path: 'login',
    element: <Login />,
  },
]);
