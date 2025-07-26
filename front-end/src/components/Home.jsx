import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [newValue, setNewValue] = useState("");

  const navigateTo = useNavigate();

  const fetchProducts = async () => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      if (!userInfo || !userInfo.token) {
        alert("Not authenticated. Please log in.");
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
        alert( err?.response?.data?.message || "Failed to fetch products." );
      }
    };

  const handleUpdate = (product) => {
    setNewValue(product.quantity);
    console.log(product.quantity);
    setIsOpen(true);
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  
  const saveUpdate = async(product) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    try{
      const { data } = await axios.put(`/api/pro/products/${product._id}/quantity`,{ 
        quantity: Number(newValue) 
      },{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        }
      }
    )
    console.log(data);
    setIsOpen(false);
      fetchProducts();
    }
    catch (error){
      alert(error);
    }
  }
  
  return (
    <div className="p-4">
  <div className="flex flex-row items-center justify-between">
    <h1 className="text-2xl font-bold mb-4">Product List</h1>
    <button className="h-10 w-16 bg-red-500 hover:bg-red-700 text-white mb-5 rounded-lg" onClick={() => navigateTo('/add')}>Add</button>
  </div>

  {products.length === 0 ? (
    <p>No products found.</p>
  ) : (
    <div className="grid grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product._id} className="border p-4 rounded shadow">
          <div className="flex flex-row justify-between">
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <button className="h-10 w-16 bg-emerald-500 hover:bg-emerald-700 text-white mb-5 rounded-lg" onClick={() => handleUpdate(product)}>Update</button>
        </div>
          <img
            src={product.image_url}
            alt={product.name}
            className="w-40 h-40 object-cover mb-2 rounded"
          />
          <p><strong>Type:</strong> {product.type}</p>
          <p><strong>Price:</strong> ₹{product.price}</p>
          <p><strong>Quantity:</strong> {product.quantity}</p>
          <p><strong>Description:</strong> {product.description}</p>
          {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-semibold mb-4">Update Quantity</h2>

            <input
              type="number"
              className="w-full px-3 py-2 border rounded-md mb-4"
              placeholder="Enter new value"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
            />

            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-700"
                onClick={() => saveUpdate(product)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
        </div>
      ))}
    </div>
    
  )}
</div>
  );
};

export default Home;
