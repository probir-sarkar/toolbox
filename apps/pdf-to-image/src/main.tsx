import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { initPdfWorker } from '@toolbox/pdf-utils'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker?url'

// Initialize PDF.js worker
initPdfWorker(pdfjsWorker)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
