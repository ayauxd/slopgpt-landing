import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import Chat from './pages/Chat.tsx'
import { PageTransition } from './components'
import { ThemeProvider } from './contexts/ThemeContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <PageTransition>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </PageTransition>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
