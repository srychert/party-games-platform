import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import AppProvider from './context/AppProvider';
import ReactDOM from 'react-dom/client';
import './index.css';
import './css/common.css';

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Create a client
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
  //    </React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
