import React, { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

const Category = () => {

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
    image: null,
  });
  const [adding, setAdding] = useState(false);

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [name, setName] = useState("")

  const fetchCategories = async () => {
      try {
        const res = await api.get("/api/categories");
        setCategories(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

  useEffect(() => {
    fetchCategories();
  }, [])

  const filteredCategories = categories.filter((cat) => 
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if(!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  }

  const handleSaveCategory = async () => {
    if(!name.trim()) {
      toast.error("Category name is required")
      return;
    }
    if(!image) {
      toast.error("Category Image is required");
      return;
    }
    try {
      setAdding(true);

      const formData = new FormData();

      formData.append("name", name);
      formData.append("image", image);

      await api.post("/api/categories", formData);

      toast.success("Category added Succesfully");

      await fetchCategories();

      setName("");
      setImage(null);
      setPreview(null);
      setShowModal(false);
    } catch (error) {
      console.error(error)
      toast.error("failed to add category")
    } finally {
      setAdding(false)
      
    }
  }

  return (
    <div className="mx-6 mt-6 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-[16px] font-medium">Category Management</h1>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-[#6F6859] px-6.5 py-3.25 rounded-md text-[16px] text-white cursor-pointer hover:bg-[#5e5646]">
          <img src="/icons/add.svg" alt="" />
          Add Category
        </button>
      </div>

      <div className="flex flex-col p-6 bg-white rounded-lg ">
        <input
          type="text"
          placeholder="Serch for Categories"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-[#999999] py-[13px] px-[26px] outline-none text-[#000000] rounded-md"
        />

        <div className="flex flex-col mt-6 w-full">
          <div
            className="
        w-full
        grid grid-cols-[0.5fr_3fr_2fr_1fr]
        font-medium
      "
          >
            <div>Sl No</div>

            <div>Category Name</div>

            <div>Products</div>

            <div className="text-left">Actions</div>
          </div>

          <hr className="mt-4" />

          <div>

            {loading ? (
              <div className="flex items-center justify-center text-center">Loading Categories...</div>
            ) : filteredCategories.map((cat, index) => (
              <div key={cat._id} className="w-full grid grid-cols-[0.5fr_3fr_2fr_1fr] items-center border-b border-[#999999] py-4">
                <div>{(index + 1).toString().padStart(2, "0")}</div>

                <div>{cat.name}</div>
                <div>{(cat.count).toString().padStart(2, "0")}</div>
                <div>
                  <div className="flex gap-2 items-center">
                    
                    <div className="p-2 hover:bg-[#D7D7FC] flex items-center rounded-full cursor-pointer">
                      <img
                        className="h-5 w-5"
                        src="/icons/edit.svg"
                        alt=""
                      />
                    </div>
                    <div className="p-2 hover:bg-[#FFD8D8] flex items-center rounded-full cursor-pointer">
                      <img
                        className="h-5 w-5"
                        src="/icons/delete.svg"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
          </div>
        </div>
      </div>
      {showModal && (
  <div onClick={() => setShowModal(false)} className="fixed inset-0 bg-black/33 flex items-center justify-center z-50">

    <div onClick={(e) => e.stopPropagation()} className=" w-[548px] bg-white p-6 flex flex-col rounded-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-[16px] font-medium">Add Category</h2>
          <button onClick={handleSaveCategory} className="flex items-center gap-2 px-[26px] py-[13px] rounded-md bg-[#6F6859] text-white hover:bg-[#5e5646] cursor-pointer">
            <img className="w-[22px] h-[22px]" src="/icons/save.svg" alt="save" />
            {adding ? "Saving..." : "Save"}
          </button>
        </div>

        <div className="flex flex-col mt-10">
          <input
           value={name}
           onChange={(e) => setName(e.target.value)}
           className="border border-[#999999] px-[16px] py-[13px] rounded-md outline-0"
           placeholder="Enter Category Name" 
           type="text" />

           <div 
            onClick={() => document.getElementById("imageUpload").click()}
           className="flex mt-10 h-[458px] border border-dashed border-[#999999] rounded-md items-center justify-center cursor-pointer">
            {preview ? (
              <img
              src={preview}
              alt="preview"
              className=" p-6 "
            />
            ) : (
              <div className="flex flex-col px-[130px] py-[170px] items-center justify-center">
              <img className="w-[64px] h-[64px]" src="/icons/upload.svg" alt="upload image" />
              <a className="mt-2 text-[16px] font-medium text-[#6F6859] text-center cursor-pointer">Upload Image</a>
              <p className="mt-1 text-[14px] text-[#999999]">Only jpg, jpeg, png files supported.</p>
              </div>
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
        accept="image/*"
        onChange={handleImageChange}
        hidden
        />
    </div>

  </div>
)}

    </div>
    
  );
};

export default Category;
