import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomRoutes from './CustomRoutes/CustomRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <div>
   <BrowserRouter>
        <Routes>
          <Route path="/*" element={<CustomRoutes/>} /> 
        </Routes>
     </BrowserRouter>
     <ToastContainer/>
   </div>
    </>
  )
}

export default App
