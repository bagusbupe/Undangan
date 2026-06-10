import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Preview from './pages/Preview'
import InvitationPage from './pages/InvitationPage'
import TemplateApp from './TemplateApp'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import AdminEditor from './pages/AdminEditor'
import ProtectedRoute from './components/ProtectedRoute'
import { AdminProvider } from './contexts/AdminContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AdminProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/preview/:id" element={<Preview />} />
          <Route path="/app" element={<ProtectedRoute><TemplateApp /></ProtectedRoute>} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/edit/:invitationId" element={<ProtectedRoute><AdminEditor /></ProtectedRoute>} />
          <Route path="/:slug" element={<InvitationPage />} />
        </Routes>
      </BrowserRouter>
    </AdminProvider>
  </React.StrictMode>,
)
