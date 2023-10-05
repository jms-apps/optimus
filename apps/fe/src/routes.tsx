import { createBrowserRouter, Link } from 'react-router-dom';
import { MyInventory } from './pages/myinventory';
import { Login } from './pages/login';
import { AddInventory } from './pages/add-inventory';

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
    path: 'add-inventory',
    element: <AddInventory />,
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
