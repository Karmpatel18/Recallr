import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import { Dashboard } from './pages/Dashboard'
import { Signup } from './pages/Signup'
import { ProtectedRoute } from './pages/ProtectedRoute'
function App() {

  return (

    <div className='bg-secondary font-inter flex w-full  min-h-screen'>
        <Routes>
          <Route path='/' element={<Home />} />


          <Route path="/login" element={<Signup />} />
          <Route
            path="/dashboard"
            element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
          />
        </Routes>
      </div>
  )
}

export default App
