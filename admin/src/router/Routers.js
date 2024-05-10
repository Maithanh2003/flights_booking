import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './../pages/Home'
import Login from './../pages/Login'
import Register from './../pages/Register'
import SearchResultList from './../pages/SearchResultList'
import TourDetails from './../pages/TourDetails'
import Tours from './../pages/Tours'
import User from '../pages/User'
import AddTour from '../pages/AddTour'
import ThankYou from '../pages/Thankyou'
import EditTour from '../services/EditTour'
import BookingUser from '../pages/BookingUser'
import About from '../pages/About'
const Routers = () => {
   return (
      <Routes>
         <Route path='/' element={<Navigate to='/home' />} />
         <Route path='/home' element={<Home />} />
         <Route path='/about' element={<About />} />
         <Route path='/user' element={<User />} />
         <Route path='/booking/:id' element={<BookingUser />} />
         <Route path='/tours' element={<Tours />} />
         <Route path='/tours/addtour' element={<AddTour />} />
         <Route path='/tours/:id' element={<TourDetails />} />
         <Route path='/tours/edit/:id' element={<EditTour />} />
         <Route path='/login' element={<Login />} />
         <Route path='/register' element={<Register />} />
         <Route path='/thank-you' element={<ThankYou />} />
         <Route path='/tours/search' element={<SearchResultList />} />
      </Routes>

   )
}

export default Routers