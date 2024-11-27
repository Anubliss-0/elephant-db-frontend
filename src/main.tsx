import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router-dom"
import router from './routes/mainRouter.tsx'
import { UserProvider } from './contexts/UserContext.tsx'
import { ThemeProvider } from './contexts/ThemeContext.tsx'
import './i18n.ts'
import './index.scss'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <ThemeProvider> 
        <RouterProvider router={router} />
      </ThemeProvider>
    </UserProvider>
  </StrictMode>
)