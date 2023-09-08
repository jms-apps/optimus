import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import resolveConfig from 'tailwindcss/resolveConfig';
// import tailwindConfig from '../tailwind.config.js';

import App from './app/app';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// const fullConfig = resolveConfig(tailwindConfig);

const defaultTheme = createTheme({
  palette: {
    primary: { main: '#0a2463' }, // 254E70 2274A5 // use rubik fonts
  },
  // typography: {
  //   fontf
  //   fontFamily: ['Rubik'],
  // },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <App />
    </ThemeProvider>
  </StrictMode>
);
