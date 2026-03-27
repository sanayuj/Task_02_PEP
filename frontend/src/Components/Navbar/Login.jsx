import React, { useState } from "react";
import { FileText } from "lucide-react";
import { Link } from "react-router-dom";

function Login() {
     const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return setError("Please fill all fields");
    }

    setError("");
    console.log("Login Data:", formData);

    // 👉 Call your backend login API here
  };

  return (
    <div> <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md border border-gray-200 p-8">
        
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-blue-500 text-white p-3 rounded-xl shadow">
            <FileText size={28} />
          </div>
          <h1 className="text-2xl font-semibold text-gray-800 mt-4">
            Sign in
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            to continue to CollabDocs
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Error */}
          {/* {error && (
            <p className="text-sm text-red-500 font-medium">{error}</p>
          )} */}

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link className="text-blue-600 hover:underline cursor-pointer font-medium" to="/signup">
          
            Sign Up
          </Link>
        </p>
      </div>
    </div></div>
  )
}

export default Login