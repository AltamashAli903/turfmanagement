import { useState } from "react";
import { registerOwner } from "../../services/ownerService";
import Swal from "sweetalert2";
import grass from "../../assets/grass.jpg";

export default function Register() {

  const [form, setForm] = useState({
    owner_name: "",
    email: "",
    phone: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const toTitleCase = (str) => {
  return str
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
const handleChange = (e) => {

  let { name, value } = e.target;

  // Title case for name
  if (name === "owner_name") {
    value = toTitleCase(value);
  }

  // Phone numbers only
  if (name === "phone") {
    value = value.replace(/\D/g, "").slice(0, 10);
  }

  setForm({
    ...form,
    [name]: value
  });

};


  const validate = () => {

    let newErrors = {};

    if (!form.owner_name.trim()) {
      newErrors.owner_name = "Name is required";
    }

    if (!form.email.includes("@")) {
      newErrors.email = "Invalid email";
    }

    if (form.phone.length !== 10) {
      newErrors.phone = "Phone must be 10 digits";
    }

    if (form.password.length < 3) {
      newErrors.password = "Password must be at least 3 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validate()) return;

    try {

      setLoading(true);

      const res = await registerOwner(form);


const ownerCode = res.data.data[0].owner_code;

Swal.fire({
  title: "🎉 Registration Successful!",
  icon: "success",
  background: "#f0fdf4",
  color: "#1f2937",
  confirmButtonText: "Continue",
  confirmButtonColor: "#15803d",
  showClass: {
    popup: "animate__animated animate__zoomIn"
  },
  hideClass: {
    popup: "animate__animated animate__zoomOut"
  }
});



      // Reset form
      setForm({
        owner_name: "",
        email: "",
        phone: "",
        password: ""
      });

      // Block button for 3 seconds
      setTimeout(() => {
        setLoading(false);
      }, 3000);

    } catch (error) {

      alert("Registration failed");
      setLoading(false);

    }

  };

  return (

    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${grass})` }}
    >

      <div className="absolute inset-0 bg-green-900/60"></div>

      <div className="relative bg-white/95 backdrop-blur-lg w-full max-w-md p-8 rounded-2xl shadow-2xl">

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Admin Registration
        </h2>

        <p className="text-center text-gray-600 mb-4">
          Turf Booking Management
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div>
            <input
              name="owner_name"
              placeholder="Enter Name"
              value={form.owner_name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            {errors.owner_name && (
              <p className="text-red-500 text-sm mt-1">{errors.owner_name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <input
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-white transition duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-700 hover:bg-green-800"
            }`}
          >
            {loading ? "Please wait..." : "Register"}
          </button>

        </form>

      </div>

    </div>

  );

}
