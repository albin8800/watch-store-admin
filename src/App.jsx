import React from 'react'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import { Route, Routes } from 'react-router-dom'
import Product from './pages/Product'
import Category from './pages/Category'
import { Toaster } from "react-hot-toast"
import ProductForm from './pages/ProductForm'


const App = () => {
  return (
    <>
    <Toaster position="center-bottom" reverseOrder={false} />
    <div className='flex h-screen overflow-hidden'>

      <Sidebar />

      <div className='flex flex-col flex-1'>
       
        <Topbar />

        <div className='flex-1 overflow-y-auto p-6'>
          <Routes>
            <Route path='/category' element={<Category />} />
            <Route path='/product' element={<Product />} />
            <Route path='/product/add' element={<ProductForm />} />
            <Route path='/product/edit/:id' element={<ProductForm />} />
          </Routes>
        </div>

      </div>

    </div>
    </>
    
  )
}

export default App
