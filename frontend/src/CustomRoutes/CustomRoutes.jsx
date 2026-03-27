import React from 'react'
import { Route,Routes } from 'react-router-dom'
import SignupPage from '../Pages/SignupPage'
import LoginPage from '../Pages/LoginPage'

function CustomRoutes() {
  return (
    <div>
    <Routes>
            <Route path="/signup" element={<SignupPage />} />
            <Route path='/login' element={<LoginPage/>}/>
           
        </Routes></div>
  )
}

export default CustomRoutes