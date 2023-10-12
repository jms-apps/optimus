import { StrictMode } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from 'react-query';

interface AppProps {
  children: JSX.Element;
}

export function App({ children }: AppProps) {
  const queryClient = new QueryClient();

  const defaultTheme = createTheme({
    palette: {
      primary: { main: '#0a2463' }, // 254E70 2274A5 // use rubik fonts
    },
    typography: {
      fontFamily: 'Lato',
    },
  });

  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>
      </QueryClientProvider>
    </StrictMode>
  );
}
