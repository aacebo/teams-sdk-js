import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { FluentProvider, teamsDarkTheme, teamsLightTheme } from '@fluentui/react-components';
import './index.css';

// Function to determine the theme based on color scheme
export const getTheme = () => {
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = prefersDarkScheme ? teamsDarkTheme : teamsLightTheme;
  return theme;
};

import App from './App-2.tsx'

const theme = getTheme();
const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <FluentProvider theme={theme}>
      <App />
    </FluentProvider>
  </StrictMode>
)
