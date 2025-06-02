
import './App.css'
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import { Dashboard } from './pages/Dashboard'
import { Login } from './pages/Login'
import { ProtectedRoute } from './pages/ProtectedRoute'
function App() {

  return (

    <div className='bg-secondary font-inter flex w-full  min-h-screen'>
      <GoogleOAuthProvider clientId="915817601711-lk2iojb01n9fcmeeepqrum0r5pv5k72p.apps.googleusercontent.com">
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
