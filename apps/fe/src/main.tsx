import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';

const defaultTheme = createTheme({
  palette: {
    primary: { main: '#0a2463' }, // 254E70 2274A5 // use rubik fonts
  },
  typography: {
    fontFamily: 'Lato',
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
