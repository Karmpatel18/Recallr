import { GoogleOAuthProvider } from "@react-oauth/google";
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import { Dashboard } from './pages/Dashboard'
import { Login } from './pages/Login'
import { ProtectedRoute } from './pages/ProtectedRoute'
function App() {

  return (

    <div className='bg-secondary font-inter flex w-full  min-h-screen'>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <Routes>
          <Route path='/' element={<Home />} />


          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
          />
        </Routes>
      </GoogleOAuthProvider>

    </div>
  )
}

export default App
