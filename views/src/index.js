import { ChakraProvider, ColorModeScript, theme } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './store/store';
import App from './App';


const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(




  
  <StrictMode>
     <ChakraProvider theme={theme}>
     <Provider store={store}>
    <BrowserRouter>
    {/* <ColorModeScript /> */}
    <App />
    </BrowserRouter>
    </Provider>
    </ChakraProvider>
  </StrictMode>
);

