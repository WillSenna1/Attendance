import './styles/globals.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app.tsx'
import { Toaster } from 'sonner'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <Toaster position='top-right' richColors />
        <App />
    </QueryClientProvider>
  </React.StrictMode>,
)
