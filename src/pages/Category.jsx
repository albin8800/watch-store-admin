import React, { useEffect, useState } from "react";
import api from "../api/axios";

const Category = () => {

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
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
    fetchCategories();
  }, [])

  const filteredCategories = categories.filter((cat) => 
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mx-6 mt-6 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-[16px] font-medium">Category Management</h1>
        <button className="flex items-center gap-2 bg-[#6F6859] px-6.5 py-3.25 rounded-md text-[16px] text-white cursor-pointer hover:bg-[#5e5646]">
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
                    <div className="p-2 hover:bg-[#D6F6D6] flex items-center rounded-full cursor-pointer">
                      <img
                        className="h-5 w-5"
                        src="/icons/view.svg"
                        alt=""
                      />
                    </div>
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
    </div>
  );
};

export default Category;
