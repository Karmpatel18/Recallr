import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import { Dashboard } from './pages/Dashboard'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { ProtectedRoute } from './pages/ProtectedRoute'
function App() {

  return (

    <div className='bg-secondary font-inter flex w-full  min-h-screen'>
        <Routes>
          <Route path='/' element={<Home />} />


          <Route path="/signup" element={<Signup />} />
          <Route path='/signin' element={<Signin/>}/>
          <Route
            path="/dashboard"
            element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
          />
        </Routes>
      </div>
  )
}

export default App
