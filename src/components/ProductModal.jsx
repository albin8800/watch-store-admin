import React, { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

const ProductModal = ({ productId, onClose }) => {

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {

      const res = await api.get(`/api/products/${productId}`);
      setProduct(res.data.product);

    } catch (error) {

      toast.error("Failed to load product");

    } finally {

      setLoading(false);

    }
  };

  if (!productId) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white w-[600px] rounded-lg p-6 relative">

      
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500"
        >
          ✕
        </button>

        {loading ? (
          <div className="text-center py-10">Loading...</div>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4">
              {product.name}
            </h2>

            <img
              src={product.image}
              alt=""
              className="w-full h-60 object-contain mb-4"
            />

            <div className="space-y-2 text-sm">

              <p><strong>Brand:</strong> {product.brand}</p>

              <p><strong>Category:</strong> {product.categoryId?.name}</p>

              <p><strong>Price:</strong> ₹{product.price}</p>

              <p><strong>MRP:</strong> ₹{product.mrp}</p>

              <p><strong>Stock:</strong> {product.stock}</p>

              <p><strong>Description:</strong> {product.description}</p>

              <p>
                <strong>Popular:</strong>{" "}
                {product.isPopular ? "Yes" : "No"}
              </p>

              <p>
                <strong>Widest:</strong>{" "}
                {product.isWidest ? "Yes" : "No"}
              </p>

            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default ProductModal;