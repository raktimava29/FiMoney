import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

const Login = () => {
    
  const [name,setName] = useState();
  const [password,setPassword] = useState();

  const navigateTo = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // console.log(name);
    // console.log(password);

    if(!name || !password){
      alert("Please fill all the fields");
      return;
    }

    try{
      const { data } = await axios.post(
        "/api/user/login",{
          username:name,
          password
        },{
          headers:{
            "Content-Type":"application/json"
          }
        })
        console.log(data);
        alert("Login Successfull!");
        navigateTo("/home");
    }
    catch (err) {
      console.error("Login Error:", err?.response?.data || err.message);
      alert(err?.response?.data?.message || "Login failed. Please try again.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Login
        </h2>
        <form className="space-y-4">
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
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            onClick={handleSubmit}
          >
            Login
          </button>
          <div className="flex flex-row justify-center gap-2 text-lg">New User?
            <p 
              className="text-red-600 cursor-pointer hover:underline" 
              onClick={() => { navigateTo('/')}}
            >
              Signup
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
