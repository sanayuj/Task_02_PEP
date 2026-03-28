import React from 'react'
import { Route,Routes } from 'react-router-dom'
import SignupPage from '../Pages/SignupPage'
import LoginPage from '../Pages/LoginPage'
import DashboardPage from '../Pages/DashboardPage'
import EditorPage from '../Pages/EditorPage'

function CustomRoutes() {
  return (
    <div>
    <Routes>
            <Route path="/signup" element={<SignupPage />} />
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/' element={<DashboardPage/>}/>
            <Route path='/editor/:id' element={<EditorPage/>}/>
           
        </Routes></div>
  )
}

export default CustomRoutes