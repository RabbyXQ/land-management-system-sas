import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { I18nextProvider } from 'react-i18next';
import i18n from './Utils/i18n';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './Utils/theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <I18nextProvider i18n={i18n}>
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
  </I18nextProvider>
);

reportWebVitals();
