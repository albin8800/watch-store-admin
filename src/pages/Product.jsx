import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios';
import toast from 'react-hot-toast';
import ConfirmModal from '../components/ConfirmModal';

const Product = () => {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10)

  const [deleteModal, setDeleteModal] = useState({
      open: false,
      category: null,
    })
  
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  
  const fetchProducts = async (page = 1) => {
    try {
      setLoading(true);

      const res = await api.get(`/api/products?page=${page}&limit=${limit}`)
      setProducts(res.data.products);
      setTotalPages(res.data.totalPages || 1)
      setCurrentPage(res.data.currentPage)
      setLimit(res.data.limit)

    } catch (error) {
      toast.error("Failed to fetch products")
      console.error(error)
    } finally {
      setLoading(false);
    }
  }

  const handleDeleteProduct = async () => {
    try {
      setDeleting(true);
      await api.delete(`/api/products/${deleteModal.product._id}`);
      toast.success("Product deleted Succesfully");
      setDeleteModal({
        open: false,
        product: null,
      });
      fetchProducts();
    } catch (error) {
      toast.error("Failed to delete Product");
    } finally {
      setDeleting(false)
    }
  }

    const filteredProducts = products.filter((product) => 
    product.name.toLowerCase().includes(search.toLowerCase())
    );

  const getPagination = () => {
    const pages = [];

    if(totalPages <= 7) {
      return Array.from({ length: totalPages}, (_, i) => i + 1);
    }
    if(currentPage <= 4) {
      return [1, 2, 3, 4, 5, "...", totalPages]
    }

    if(currentPage >= totalPages - 3) {
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }
    return [
      1,
      "...",
      currentPage -1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ]
  } 

  

  return (
    <div className=" mt-6 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-[16px] font-medium">Product Management</h1>
        <button onClick={() => navigate("/product/add")} className="flex items-center gap-2 bg-[#6F6859] px-6.5 py-3.25 rounded-md text-[16px] text-white cursor-pointer hover:bg-[#5e5646]">
          <img src="/icons/add.svg" alt="" />
          Add Product
        </button>
      </div>

      <div className="flex flex-col p-6 bg-white rounded-lg ">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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

           {loading ? (
              <div className="flex items-center justify-center text-center">Loading Products...</div>
           ) : (

            filteredProducts.map((product, index) => (

                <div key={product._id} className="w-full grid grid grid-cols-[80px_3fr_1.5fr_1.5fr_120px] items-center border-b border-[#999999] py-4">
                <div>{(index + 1).toString().padStart(2, "0")}</div>

                <div className='truncate pr-24'>{product.name}</div>
                <div>{product.categoryId?.name || "--"}</div>
                <div>{(product.stock).toString().padStart(2, "0")}</div>
                <div>
                  <div className="flex gap-2 items-center">
                    
                    <div  className="p-2 hover:bg-[#D6F6D6] flex items-center rounded-full cursor-pointer">
                      <img
                        className="h-5 w-5"
                        src="/icons/view.svg"
                        alt=""
                      />
                    </div>
                    <div onClick={() => navigate(`/product/edit/${product._id}`)} className="p-2 hover:bg-[#D7D7FC] flex items-center rounded-full cursor-pointer">
                      <img
                        className="h-5 w-5"
                        src="/icons/edit.svg"
                        alt=""
                      />
                    </div>
                    <div onClick={() => setDeleteModal({
                      open: true,
                      product,
                    })} className="p-2 hover:bg-[#FFD8D8] flex items-center rounded-full cursor-pointer">
                      <img
                        className="h-5 w-5"
                        src="/icons/delete.svg"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>

            ))
           )
           
          }
              
            
              
              </div>
              </div>
              <div className="flex items-center justify-center gap-1 md:gap-4 md:mt-10 mt:8">
          <button onClick={() => setCurrentPage((prev) => Math.max(prev -1, 1))}
          disabled={currentPage === 1}
          className="flex px-[21px] py-[13px] hover:bg-[#F0ECE4] rounded-md items-center justify-center disabled:opacity-50">
            <img className="w-[22px] h-[22px]" src="/icons/arrow-left.svg" alt="" />
          </button>

          {getPagination().map((page, index) =>
          page === "..." ? (
            <span key={index} className="px-[21px] py-[13px]">
              ...
            </span>
          ) : (
            <button key={index}
            onClick={() => setCurrentPage(page)}
            className={`px-[21px] py-[13px] rounded-md ${
              currentPage === page ? "bg-[#F0ECE4] text-[#6F6859] text-[16px]" : "hover:bg-[#F0ECE4] text-[#827C6F] text-[16px]"
            }`}
            >
              {page}
            </button>
          )
          )}

          <button onClick={() => setCurrentPage((prev) => Math.max(prev -1, 1))}
          disabled={currentPage === 1}
          className="flex px-[21px] py-[13px] hover:bg-[#F0ECE4] rounded-md items-center justify-center disabled:opacity-50">
            <img className="w-[22px] h-[22px]" src="/icons/arrow-right.svg" alt="" />
          </button>
        </div>
              </div>

              <ConfirmModal
open={deleteModal.open}
  title="Delete This Product"
  message={`Are you sure you want to delete "${deleteModal.product?.name}"?`}
  loading={deleting}
  onConfirm={handleDeleteProduct}
  onCancel={() =>
    setDeleteModal({
      open: false,
      product: null,
    })
  }
/>
              </div>
              
              
              
  )
}

export default Product
