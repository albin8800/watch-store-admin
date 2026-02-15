import React from 'react'
import { NavLink } from 'react-router-dom'


const Sidebar = () => {

    const navItems = [
        { name: "Dashboard", path: "/", icon:"/icons/dashboard.svg"},
        { name: "Category Management", path: "/category", icon:"icons/category.svg"},
        { name: "Product Management", path: "/product", icon:"icons/product.svg"},
        { name: "User Management", path: "/user", icon:"icons/user.svg"},
        { name: "Order Management", path: "/order", icon:"icons/order.svg"},
        { name: "Logout", path: "/logout", icon:"icons/logout.svg"},
    ]
  return (
    <div className='min-h-screen bg-[#6F6859] w-[337px] flex flex-col px-6'>
        <div className='flex mt-10 items-center'>
            <img className='w-[181px] h-[120px]' src="/images/logo.svg" alt="" />
        </div>
      

      <div className='flex flex-col gap-2 mt-14'>
        {navItems.map(item => (
            <NavLink key={item.name} to={item.path}>

                {({ isActive }) => (
                    <div className={`flex gap-2 px-4 py-2 rounded-md items-center hover:bg-[#A19A8B] ${isActive ? "bg-[#A19A8B]" : "bg-transparent"}`}>
                     <img className='w-[22px] h-[22px]' src={item.icon} alt="" />
                     <p className='text-white text-[16px] font-medium'>{item.name}</p>
                    </div>
                )}
                
            
            </NavLink>
            
        ))}
      </div>
    </div>
  )
}

export default Sidebar
