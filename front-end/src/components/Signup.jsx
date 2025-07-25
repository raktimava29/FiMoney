import { useState } from "react";
import { useNavigate } from "react-router";
import axios from 'axios';

const Signup = () => {

  const [name,setName] = useState('');
  const [password,setPassword] = useState('');
  
  const navigateTo = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // console.log(name);
    // console.log(password);

    if (!name || !password) {
      alert("Please fill all the fields.");
      return;
    }

    try {
      await axios.post('/api/user/register', {
        username: name,
        password,
      });

      alert("Account created successfully!");
      navigateTo("/login");
    } 
    catch (err) {
      console.error("Signup Error:", err?.response?.data || err.message);
      alert(err?.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-red-600 mb-6">
          Signup
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
            
          >
            Signup
          </button>
          <div className="flex flex-row justify-center gap-2 text-lg"> Have an account?
            <p 
              className="text-blue-600 cursor-pointer hover:underline" 
              onClick={() => { navigateTo('/login')}}
            >
              Login
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
