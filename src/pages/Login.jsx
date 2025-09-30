import React,{ useState} from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Login = () => {
      const [formData, setFormData] = useState({ email: "", password: "" });
const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Login data:", formData);
    try {
      const res = await api.post("/api/v1/auth/login", formData);
      console.log(res.data);
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        alert("User logged in successfully");
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
      
    }
  };
  return (
   <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 text-center">
          Welcome Back 👋
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Login to your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <a href="/register" className="font-semibold text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  )
}

export default Login