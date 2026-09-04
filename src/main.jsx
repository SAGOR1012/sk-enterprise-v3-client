// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './Routes/Route';
import AuthProviders from './providers/AuthProviders';

// Import QueryClient and QueryClientProvider
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Suspense } from 'react';

// Create a client instance
const queryClient = new QueryClient({
  // defaultOptions: {
  //   queries: {
  //     suspense: true, // Enable suspense for queries
  //   }
  // }
});

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <QueryClientProvider client={ queryClient }>
    <AuthProviders>
      {/* <Suspense fallback={ <div>Hello...</div> }> */ }
      <RouterProvider router={ router } />

      {/* </Suspense> */ }
    </AuthProviders>
  </QueryClientProvider>
  // </StrictMode>,
)
