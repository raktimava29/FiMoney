import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      if (!userInfo || !userInfo.token) {
        setError("Not authenticated. Please log in.");
        return;
      }

      try {
        const { data } = await axios.get("/api/pro/products", {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });

        setProducts(data);
      } catch (err) {
        setError(
          err?.response?.data?.message || "Failed to fetch products."
        );
      }
    };

    fetchProducts();
  }, []);

  if (error) {
    return <div className="text-red-600 text-lg">{error}</div>;
  }

  return (
    <div className="p-4">
  <div className="flex flex-row items-center justify-between">
    <h1 className="text-2xl font-bold mb-4">Product List</h1>
    <button className="h-10 w-16 bg-red-700 text-white mb-5 rounded-lg" onClick={navigateTo('/add')}>Add</button>
  </div>

  {products.length === 0 ? (
    <p>No products found.</p>
  ) : (
    <div className="grid grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product._id} className="border p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
          <img
            src={product.image_url}
            alt={product.name}
            className="w-40 h-40 object-cover mb-2 rounded"
          />
          <p><strong>Type:</strong> {product.type}</p>
          <p><strong>Price:</strong> ₹{product.price}</p>
          <p><strong>Quantity:</strong> {product.quantity}</p>
          <p><strong>Description:</strong> {product.description}</p>
        </div>
      ))}
    </div>
  )}
</div>
  );
};

export default Home;
