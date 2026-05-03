import { useState } from "react";
import { loginOwner } from "../../services/ownerService";
import { useAuthStore } from "../../store/authStore";
import grass from "../../assets/grass.jpg";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [form, setForm] = useState({
    login_id: "",
    password: ""
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await loginOwner(form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("owner", JSON.stringify(res.data.owner));

      setAuth(res.data);

      // ✅ Redirect after login
      navigate("/admin/dashboard");

    } catch (error) {

      alert("Login Failed");

    }

  };

  return (

    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${grass})` }}
    >

      {/* Green Overlay */}
      <div className="absolute inset-0 bg-green-900/60"></div>

      {/* Login Card */}
      <div className="relative bg-white/95 backdrop-blur-lg w-full max-w-md p-8 rounded-2xl shadow-2xl">

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Admin Login
        </h2>

        <p className="text-center text-gray-600 mb-6">
          Turf Booking Management
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="login_id"
            placeholder="Email / Phone"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-600"
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-600"
            onChange={handleChange}
            required
          />

          <button
            className="w-full bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800 transition duration-300"
          >
            Login
          </button>

        </form>

      </div>

    </div>

  );

}
