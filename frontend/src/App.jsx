import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './components/login'
import Home from './components/Home'
import Landing from './components/Landing'
import UserSignup from './components/UserSignup'
import Dashboard from './components/Dashboard'
import UserProfile from './components/UserProfile'
const App = () => {
  return (
    <div >
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/home' element={<Home />} />
        <Route path='/userprofile' element={<UserProfile />} />
        
      </Routes>
    </div>
  )
}

export default App
