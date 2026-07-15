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
  className="relative flex min-h-screen items-center justify-center bg-cover bg-center px-4 py-8 sm:px-6   lg:px-8"
  style={{ backgroundImage: `url(${grass})` }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-black/50"></div>

  {/* Login Card */}
  <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg rounded-3xl bg-white/95 p-6 shadow-2xl backdrop-blur-lg sm:p-8">

    <div className="mb-8 text-center">
      <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
        Admin Login
      </h1>

      <p className="mt-2 text-sm text-slate-500 sm:text-base">
        Turf Booking Management
      </p>
    </div>

    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >

      <input
        name="login_id"
        placeholder="Email / Phone"
        onChange={handleChange}
        required
        className="h-12 w-full rounded-xl border border-slate-300 px-4 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-600 sm:h-13 sm:text-base"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        required
        className="h-12 w-full rounded-xl border border-slate-300 px-4 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-600 sm:h-13 sm:text-base"
      />

      <button
        className="h-12 w-full rounded-xl bg-green-700 text-base font-semibold text-white transition hover:bg-green-800 sm:h-13"
      >
        Sign In
      </button>

      <div className="space-y-3 pt-2 text-center">

        <p className="text-sm text-slate-600">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="font-semibold text-green-700 hover:underline"
          >
            Sign Up
          </button>
        </p>

        <button
          type="button"
          onClick={() => navigate("/forgot-password")}
          className="text-sm font-medium text-slate-700 hover:text-green-700 hover:underline"
        >
          Forgot Password?
        </button>

      </div>

    </form>

  </div>
</div>

    </>
  );

}
