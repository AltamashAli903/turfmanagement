import { useState } from "react";
import API from "../api/axios";
import Toast from "../components/Ui/Toast";
import grass from "../assets/grass.jpg";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
//   const setAuth = useAuthStore((state) => state.setAuth);
  const [toast, setToast] = useState(null);
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
    const res = await API.post("/owner/login", form);

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("owner", JSON.stringify(res.data.owner));

    setToast({
      message: "Login Successful",
      type: "success",
    });

    navigate("/dashboard");

  } catch (error) {
    setToast({
      message: error?.response?.data?.message || "Login Failed",
      type: "error",
    });
  }
};
  return (

    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
        style={{ backgroundImage: `url(${grass})` }}
      >

        {/* Green Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

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
              Sign In
            </button>
          

            <div className="text-center text-gray-600 ">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="font-semibold text-black hover:text-green-900 hover:underline transition-colors"
              >
                Sign up
              </button>
            </div>

             <button
  type="button"
  onClick={() => navigate("/forgot-password")}
  className="block mx-auto font-semibold text-black hover:text-green-900 hover:underline transition-colors"
>
  Forgot Password?
</button>

          </form>

        </div>

      </div>

    </>
  );

}
