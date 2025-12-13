import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AuthDemo from './components/AuthDemo'
import { useAuth } from './lib/useAuth'

const AppContent = lazy(() => import('./AppContent'))

export const App = () => {
  const user = useAuth()

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <AuthDemo />}
        />
        <Route
          path="/"
          element={
            user ? (
              <Suspense fallback={<div>Loading...</div>}>
                <AppContent />
              </Suspense>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
