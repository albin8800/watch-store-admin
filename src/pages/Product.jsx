import React from 'react'
import { useNavigate } from 'react-router-dom'

const Product = () => {

  const navigate = useNavigate();

  return (
    <div className="mx-6 mt-6 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-[16px] font-medium">Product Management</h1>
        <button onClick={() => navigate("/product/add")} className="flex items-center gap-2 bg-[#6F6859] px-6.5 py-3.25 rounded-md text-[16px] text-white cursor-pointer hover:bg-[#5e5646]">
          <img src="/icons/add.svg" alt="" />
          Add Product
        </button>
      </div>

      <div className="flex flex-col p-6 bg-white rounded-lg ">
        <input
          type="text"
          placeholder="Serch for Products..."
          className="border border-[#999999] py-[13px] px-[26px] outline-none text-[#000000] rounded-md"
        />

        <div className="flex flex-col mt-6 w-full">
          <div
            className="
        w-full
        grid grid-cols-[80px_3fr_1.5fr_1.5fr_120px]
        font-medium
      "
          >
            <div>Sl No</div>

            <div>Product Name</div>

            <div>Category</div>

            <div>Total Products</div>

            <div className="text-left">Actions</div>
          </div>

          <hr className="mt-4" />

          <div>

           
              {/* <div className="flex items-center justify-center text-center">Loading Categories...</div> */}
            
              <div className="w-full grid grid grid-cols-[80px_3fr_1.5fr_1.5fr_120px] items-center border-b border-[#999999] py-4">
                <div>01</div>

                <div className='truncate pr-24'>Hammer Unisex Smart Watch Long Battery Mens unisex watch</div>
                <div>Smart Watches</div>
                <div>05</div>
                <div>
                  <div className="flex gap-2 items-center">
                    
                    <div  className="p-2 hover:bg-[#D6F6D6] flex items-center rounded-full cursor-pointer">
                      <img
                        className="h-5 w-5"
                        src="/icons/view.svg"
                        alt=""
                      />
                    </div>
                    <div  className="p-2 hover:bg-[#D7D7FC] flex items-center rounded-full cursor-pointer">
                      <img
                        className="h-5 w-5"
                        src="/icons/edit.svg"
                        alt=""
                      />
                    </div>
                    <div  className="p-2 hover:bg-[#FFD8D8] flex items-center rounded-full cursor-pointer">
                      <img
                        className="h-5 w-5"
                        src="/icons/delete.svg"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
              </div>
              </div>
              </div>
              </div>
              
              
              
  )
}

export default Product
