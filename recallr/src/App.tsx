import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import { Dashboard } from './pages/Dashboard'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { ProtectedRoute } from './pages/ProtectedRoute'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {

  return (

    <div className='bg-secondary font-manrope flex w-full  min-h-screen'>
      <Routes>
        <Route path='/' element={<Home />} />


        <Route path="/signup" element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
        />

      </Routes>
      <ToastContainer 
        position="top-right" 
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark" />
    </div>
  )
}

export default App
