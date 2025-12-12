
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'

import MainRoutes from './app/routes/MainRoutes.jsx'

createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <MainRoutes />
  </HelmetProvider>
)
