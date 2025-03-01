import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './components/login'
import Home from './components/Home'
import Landing from './components/Landing'
import UserSignup from './components/UserSignup'
import Dashboard from './components/Dashboard'
import UserProfile from './components/UserProfile'
import UserProtectedWrapper from './components/UserProtectedWrapper'
import AuctionList from './components/AuctionList'
import AuctionItem from './components/AuctionItem'
import CreateAuctionItem from './components/CreateAuctionItem'
const App = () => {
  return (
    <div >
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/auctions' element={<AuctionItem />} />
        <Route path='/home' element={
          <UserProtectedWrapper>

            <Home />
          </UserProtectedWrapper>
        } />
        <Route path='/userprofile' element={<UserProfile />} />
        <Route path='/auction/create' element={<CreateAuctionItem />} />
        
       
        
      </Routes>
    </div>
  )
}

export default App
