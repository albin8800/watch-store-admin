import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../api/axios';
import toast from 'react-hot-toast';

const ProductForm = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    const isEditMode = Boolean(id);

    const [categories, setCategories] = useState([]);

    const [form, setForm] = useState({
        name: "",
        brand: "",
        categoryId: "",
        price: "",
        mrp: "",
        stock: "",
        description: "",
        isPopular: false,
        isWidest: false
        });

        const [image, setImage] = useState(null);
        const [preview, setPreview] = useState(null)

        const [loading, setLoading] = useState(false);

        

        useEffect(() => {
            fetchCategories();
        }, []);

        const fetchCategories = async () => {
            try {
                const res = await api.get("api/categories");
                setCategories(res.data.categories);
            } catch (error) {
                console.error(error)
                toast.error("Failed to load Categories")
            }
        }

        const fetchProduct = async () => {
            const res = await api.get(`/api/products/${id}`);

            const product = res.data.product;

            setForm({
              name: product.name,
              brand: product.brand,
              categoryId: product.categoryId._id,
              price: product.price,
              mrp: product.mrp,
              stock: product.stock,
              description: product.description,
              isPopular: product.isPopular,
              isWidest: product.isWidest,
            });

            setPreview(product.image);
        }

        useEffect(() => {
            if(isEditMode) {
                fetchProduct();
            }
        }, [id])

        const handleChange = (e) => {
            const { name, value, type, checked } = e.target;

            setForm({
                ...form,
                [name] : type === "checkbox" ? checked : value,
            });
        }

        const handleImageChange = (e) => {
            const file = e.target.files[0];

            if(!file) return;

            setImage(file);
            setPreview(URL.createObjectURL(file));
        };
        
        const handleSubmit = async (e) => {
            e.preventDefault();

            

            try {
                setLoading(true);

                const data = new FormData();

                data.append("name", form.name);
                data.append("brand", form.brand);
                data.append("categoryId", form.categoryId);
                data.append("price", form.price);
                data.append("mrp", form.mrp);
                data.append("stock", form.stock);
                data.append("description", form.description);
                data.append("isPopular", form.isPopular ? "true" : "false");
                data.append("isWidest", form.isWidest ? "true" : "false");
                
                if(image) {
                    data.append("image", image);
                }
                if(isEditMode) {
                    await api.put(`/api/products/${id}`, data);
                    toast.success("Product Updated Succesfully");
                } else {
                    if(!image) {
                        toast.error("Image required");
                        return;
                    }

                await api.post("/api/products", data);
                toast.success("Product added Succesfully");
                }

                navigate("/product")
            } catch (error) {
                console.error(error)
                toast.error("Failed to add Product")
            } finally {
                setLoading(false)
            }
        } 

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
            <button onClick={handleSubmit} disabled={loading} className='flex items-center px-[26px] py-[13px] gap-2 text-[16px] text-white bg-[#6F6859] rounded-md cursor-pointer'>
                <img className='h-[22px] w-[22px]' src="/icons/save.svg" alt="" />
                {loading ? "Saving..." :isEditMode ? "Update" : "Save"}
            </button>
        </div>
      </div>

      <div className='p-6 flex gap-6 bg-[#FFFFFF] rounded-lg mt-6'>
        <form className='flex flex-col gap-4 w-3/4'>
            <div className='flex flex-col gap-2 w-full'>
                <label className='text-[16px] font-medium'>Product Name</label>
                <input
                 name='name'
                 value={form.name}
                 onChange={handleChange}
                type="text"
                placeholder='Enter Product Name'
                className='px-[16px] py-[13px] border border-[#999999] rounded-md outline-0'
                />
            </div>

            <div className='flex gap-4'>
                <div className='flex flex-col gap-2 w-1/2'>
                <label className='text-[16px] font-medium'>Brand</label>
                <input
                name='brand'
                value={form.brand}
                onChange={handleChange} 
                type="text"
                placeholder='Enter Brand Name'
                className='px-[16px] py-[13px] border border-[#999999] rounded-md outline-0'
                />
                </div>
                <div className='flex flex-col gap-2 w-1/2'>
                <label className='text-[16px] font-medium'>Category</label>
                <select
                 name='categoryId'
                 value={form.categoryId}
                 onChange={handleChange}
                className='px-[16px] py-[13px] border border-[#999999] rounded-md outline-0'>
                    <option>Select Category</option>
                    {categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                    
                </select>
                </div>
            </div>
            <div className='flex gap-4'>
                <div className='flex flex-col gap-2 w-1/2'>
                <label className='text-[16px] font-medium'>Price</label>
                <input
                name='price'
                value={form.price}
                onChange={handleChange} 
                type="text"
                placeholder='Enter Price'
                className='px-[16px] py-[13px] border border-[#999999] rounded-md outline-0'
                />
                </div>
                <div className='flex flex-col gap-2 w-1/2'>
                <label className='text-[16px] font-medium'>MRP</label>
                <input
                name='mrp'
                value={form.mrp}
                onChange={handleChange} 
                type="text"
                placeholder='Enter MRP'
                className='px-[16px] py-[13px] border border-[#999999] rounded-md outline-0'
                />
                </div>
            </div>

            <div className='flex flex-col gap-2 w-1/2'>
                <label className='text-[16px] font-medium'>Stock</label>
                <input
                name='stock'
                value={form.stock}
                onChange={handleChange} 
                type="text"
                placeholder='Enter Stock'
                className='px-[16px] py-[13px] border border-[#999999] rounded-md outline-0'
                />
            </div>
            <div className='flex flex-col gap-2 w-full'>
                <label className='text-[16px] font-medium'>Description</label>
                <textarea
                 name='description'
                 value={form.description}
                 onChange={handleChange} 
                 placeholder='Enter Description'
                className='px-[16px] py-[13px] border border-[#999999] rounded-md outline-0'></textarea>
            </div>

            <div className='flex gap-4'>
                <div className='flex gap-2 items-center'>
                <input
                name='isPopular'
                checked={form.isPopular}
                onChange={handleChange} 
                type="checkbox"
                className='w-6 h-6 accent-[#6F6859] cursor-pointer'
                />
                <label className='text-[16px] font-medium'>Popular Product</label>
                </div>
                <div className='flex gap-2 items-center'>
                <input
                name='isWidest'
                checked={form.isWidest}
                onChange={handleChange}  
                type="checkbox"
                className='w-6 h-6 accent-[#6F6859] cursor-pointer'
                />
                <label className='text-[16px] font-medium'>Widest Product</label>
                </div>
            </div>



            
        </form>

        <div className='flex flex-col gap-2 w-[331px]'>
            <label className='text-[16px] font-medium'>Product Image</label>
            <div  onClick={() => document.getElementById("imageUpload").click()} className='flex flex-col px-[63px] py-[121px] items-center justify-center border border-dashed border-[#999999] rounded-md cursor-pointer'>
                {preview ? (
                    <img
              src={preview}
              alt="preview"
              className=" w-full h-full object-contain "
            /> 
                ) : (
                    <>
                    <img className='w-10 h-10 items-center' src="/icons/upload.svg" alt="" />
                <div className='flex flex-col items-center gap-1 mt-2 '>
                    <p className='text-[14px] text-[#6F6859] font-medium'>Upload Image</p>
                    <p className='text-[12px] text-[#999999] text-center'>Only jpg, jpeg, png files supported.</p>
                </div>
                    </>
                    
                )}
              
                
            </div>
            {preview ? (
              <button
               onClick={() => document.getElementById("imageUpload").click()}
              className="mt-2 text-[16px] font-medium cursor-pointer">
              Change Image
            </button>
            ) : (
              ""
            )}
        </div>
        <input 
        type="file"
        id="imageUpload"
        onChange={handleImageChange}
        accept="image/*"
        hidden
        />
      </div>
    </div>
  )
}

export default ProductForm
