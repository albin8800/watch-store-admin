import React from 'react'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import { Route, Routes } from 'react-router-dom'
import Product from './pages/Product'
import Category from './pages/Category'
import { Toaster } from "react-hot-toast"


const App = () => {
  return (
    <>
    <Toaster position="top-right" reverseOrder={false} />
    <div className='flex h-screen overflow-hidden'>

      <Sidebar />

      <div className='flex flex-col flex-1'>
       
        <Topbar />

        <div className='flex-1 overflow-y-auto p-6'>
          <Routes>
            <Route path='/category' element={<Category />} />
            <Route path='/product' element={<Product />} />
          </Routes>
        </div>

      </div>

    </div>
    </>
    
  )
}

export default App
