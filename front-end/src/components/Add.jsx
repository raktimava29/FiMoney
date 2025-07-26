import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

const Add = () => {

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    sku: "",
    image_url: "",
    description: "",
    quantity: "",
    price: ""
  });

  const navigateTo = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue =
      name === "price" || name === "quantity" ? Number(value) : value;

    setFormData((prev) => ({
      ...prev,
      [name]: updatedValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      if (!userInfo || !userInfo.token) {
        alert("Not authenticated. Please log in.");
        return;
      }

    try {
      const { data } = await axios.post("/api/pro/products", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        }
      });

      console.log("Product Created:", data);
      alert(data.message);
    } catch (error) {
      console.error("Error creating product:", error.response?.data || error.message);
      alert("Failed to create product");
    }
    navigateTo('/home');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Add Product
        </h2>
        <form onSubmit={handleSubmit}>
          {[
            { name: "name", type: "text" },
            { name: "type", type: "text" },
            { name: "sku", type: "text" },
            { name: "image_url", type: "text" },
            { name: "description", type: "text" },
            { name: "quantity", type: "number" },
            { name: "price", type: "number" }
          ].map((field) => (
            <div key={field.name}>
              <label className="text-sm font-medium text-gray-700 mb-1 capitalize">
                {field.name.replace("_", " ")}
              </label>
              <input
                type={field.type}
                name={field.name}
                className="w-full mb-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`Enter ${field.name.replace("_", " ")}`}
                value={formData[field.name]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
