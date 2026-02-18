import React from 'react'
import { useNavigate } from 'react-router-dom'

const ProductForm = () => {

    const navigate = useNavigate();

  return (
    <div className='flex flex-col'>
      <div className='flex justify-between items-center'>
        <h2 className='text-[16px] font-medium'>Add Product</h2>
        <div className='flex items-center gap-4'>
            <button
             onClick={() => navigate("/product")}
            className='flex items-center px-[26px] py-[13px] gap-2 text-[16px] text-[#999999] border border-[#999999] rounded-md cursor-pointer'>
                <img className='h-[22px] w-[22px]' src="/icons/cancel.svg" alt="" />
                Cancel
            </button>
            <button className='flex items-center px-[26px] py-[13px] gap-2 text-[16px] text-white bg-[#6F6859] rounded-md cursor-pointer'>
                <img className='h-[22px] w-[22px]' src="/icons/save.svg" alt="" />
                Save
            </button>
        </div>
      </div>

      <div className='p-6 flex gap-6 bg-[#FFFFFF] rounded-lg mt-6'>
        <form className='flex flex-col gap-4 w-3/4'>
            <div className='flex flex-col gap-2 w-full'>
                <label className='text-[16px] font-medium'>Product Name</label>
                <input 
                type="text"
                placeholder='Enter Product Name'
                className='px-[16px] py-[13px] border border-[#999999] rounded-md outline-0'
                />
            </div>

            <div className='flex gap-4'>
                <div className='flex flex-col gap-2 w-1/2'>
                <label className='text-[16px] font-medium'>Brand</label>
                <input 
                type="text"
                placeholder='Enter Brand Name'
                className='px-[16px] py-[13px] border border-[#999999] rounded-md outline-0'
                />
                </div>
                <div className='flex flex-col gap-2 w-1/2'>
                <label className='text-[16px] font-medium'>Category</label>
                <select className='px-[16px] py-[13px] border border-[#999999] rounded-md outline-0'>
                    <option>Select Category</option>
                    <option>Category 1</option>
                    <option>Category 2</option>
                </select>
                </div>
            </div>
            <div className='flex gap-4'>
                <div className='flex flex-col gap-2 w-1/2'>
                <label className='text-[16px] font-medium'>Price</label>
                <input 
                type="text"
                placeholder='Enter Price'
                className='px-[16px] py-[13px] border border-[#999999] rounded-md outline-0'
                />
                </div>
                <div className='flex flex-col gap-2 w-1/2'>
                <label className='text-[16px] font-medium'>MRP</label>
                <input 
                type="text"
                placeholder='Enter MRP'
                className='px-[16px] py-[13px] border border-[#999999] rounded-md outline-0'
                />
                </div>
            </div>

            <div className='flex flex-col gap-2 w-1/2'>
                <label className='text-[16px] font-medium'>Stock</label>
                <input 
                type="text"
                placeholder='Enter Stock'
                className='px-[16px] py-[13px] border border-[#999999] rounded-md outline-0'
                />
            </div>
            <div className='flex flex-col gap-2 w-full'>
                <label className='text-[16px] font-medium'>Description</label>
                <textarea 
                 placeholder='Enter Description'
                className='px-[16px] py-[13px] border border-[#999999] rounded-md outline-0'></textarea>
            </div>

            <div className='flex gap-4'>
                <div className='flex gap-2 items-center'>
                <input 
                type="checkbox"
                className='w-6 h-6 accent-[#6F6859] cursor-pointer'
                />
                <label className='text-[16px] font-medium'>Popular Product</label>
                </div>
                <div className='flex gap-2 items-center'>
                <input 
                type="checkbox"
                className='w-6 h-6 accent-[#6F6859] cursor-pointer'
                />
                <label className='text-[16px] font-medium'>Widest Product</label>
                </div>
            </div>



            
        </form>

        <div className='flex flex-col gap-2 w-[331px]'>
            <label className='text-[16px] font-medium'>Product Image</label>
            <div className='flex flex-col px-[63px] py-[121px] items-center justify-center border border-dashed border-[#999999] rounded-md'>
                <img className='w-10 h-10 items-center' src="/icons/upload.svg" alt="" />
                <div className='flex flex-col items-center gap-1 mt-2 '>
                    <p className='text-[14px] text-[#6F6859] font-medium'>Upload Image</p>
                    <p className='text-[12px] text-[#999999] text-center'>Only jpg, jpeg, png files supported.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ProductForm
