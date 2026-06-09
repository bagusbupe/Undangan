import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Preview from './pages/Preview'
import TemplateApp from './TemplateApp'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/preview/:id" element={<Preview />} />
        <Route path="/app" element={<TemplateApp />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
