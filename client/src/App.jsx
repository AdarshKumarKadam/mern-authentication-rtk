import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import SignUp from './components/SignUp'
import { Toaster } from 'react-hot-toast'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'
import Profile from './components/Profile'
import UnauthorizedPage from'./components/UnauthorizedPage'
import Roles from './constants/roles'
import ProtectedRoute from './components/ProtectedRoute'

function App() {

  return (
  <>
  <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/resetPassword/:otp" element={<ResetPassword />} />
          <Route path="/profile" element={<ProtectedRoute path="/profile" roles={[Roles.USER]} component={<Profile />} /> } />
          <Route path="/unauthorized" component={<UnauthorizedPage/>} />
          {/* <ProtectedRoute path="/profile" roles={[Roles.USER]} component={<Profile />} /> */}


        </Routes>
      </BrowserRouter>
    </>

  )
}

export default App
