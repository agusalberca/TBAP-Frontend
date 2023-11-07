import log from 'loglevel';
import * as React from 'react';

import './features/i18n/i18n';
import { theme } from './features/ui/components/Layout/Theme/theme';
import { Router } from './pages/Router';
import store from './store/store';
import AppContextProvider from './context/AppContext';
import { QueryClient, QueryClientProvider } from 'react-query'
import './styles/index.sass'
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './store/store';


log.setDefaultLevel('silent');

if (process.env.NODE_ENV !== 'production') {
  log.enableAll();
} else {
  log.disableAll();
}

const Provider = React.lazy(() =>
  import(/* webpackChunkName: "Redux" */ 'react-redux').then(module => ({
    default: module.Provider,
  }))
);

const ChakraProvider = React.lazy(() =>
  import(/* webpackChunkName: "ChakraUI" */ '@chakra-ui/react').then(
    module => ({
      default: module.ChakraProvider,
    })
  )
);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      keepPreviousData: false
    },
  },
})

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ChakraProvider theme={theme}>
            <AppContextProvider> {/* Add the AuthContextProvider */}
              <Router />
            </AppContextProvider>
          </ChakraProvider>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
};

