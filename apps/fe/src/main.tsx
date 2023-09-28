import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

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
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={defaultTheme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
