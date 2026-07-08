import { useEffect, useState } from "react";
import API from "../api/axios";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { formatTo12Hour, convertTo24Hour } from "../utils/timeFormat";
import TurfModal from "../components/Model/TurfModel";

export default function Turf() {
   const [collapsed, setCollapsed] = useState(false);
  const [turfs, setTurfs] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [coverImage, setCoverImage] = useState(null);
  const url = ""

  const [form, setForm] = useState({
    turf_id: "",
    turf_name: "",
    sport_type: "",
    location: "",
    address: "",
    opening_time: "",
    closing_time: "",
    cover_image: ""

  });

  const fetchTurfs = async () => {
    try {
      const owner = JSON.parse(localStorage.getItem("owner"));

      const res = await API.post("/turf/get-turf", {
        owner_id: owner.id,
      });

      setTurfs(Array.isArray(res.data.data) ? res.data.data : []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTurfs();
  }, []);

  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openModal]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const opening_time = form.opening_time;
    const closing_time = form.closing_time;

    const formData = new FormData();

    formData.append("turf_id", form.turf_id);
    formData.append("turf_name", form.turf_name);
    formData.append("sport_type", form.sport_type);
    formData.append("location", form.location);
    formData.append("address", form.address);
    formData.append("description", form.description || "");
    formData.append("opening_time", opening_time);
    formData.append("closing_time", closing_time);

    if (coverImage) {
      formData.append("cover_image", coverImage);
    }

    try {
      const owner = JSON.parse(localStorage.getItem("owner"));

      if (isEdit) {
        formData.append("old_cover_image", form.cover_image || "");

        await API.put("/turf/update", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        formData.append("owner_id", owner.id);

        await API.post("/turf/create", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      setOpenModal(false);
      setIsEdit(false);
      setCoverImage(null);
      fetchTurfs();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (turf) => {
    setForm({
      turf_id: turf.id,
      turf_name: turf.turf_name,
      sport_type: turf.sport_type,
      location: turf.location,
      address: turf.address,
      description: turf.description || "",
      opening_time: turf.opening_time.substring(0, 5),
      closing_time: turf.closing_time.substring(0, 5),
      cover_image: turf.cover_image || ""
    });

    setCoverImage(null);
    setIsEdit(true);
    setOpenModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this turf?")) return;
    await API.put("/turf/delete", {
      turf_id: id,
    });
  };

  const resetForm = () => {
    setForm({
      turf_id: "",
      turf_name: "",
      sport_type: "",
      location: "",
      address: "",
      opening_time: "",
      closing_time: "",
      cover_image: ""
    });
    setCoverImage(null);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-1 bg-white p-5">
          <div>

            {/* HEADER */}
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-semibold text-slate-900">
                  Turf Management ({turfs.length})
                </h1>
                {/* <p className="text-slate-500 text-sm mt-1">
            Manage all your turfs
          </p> */}
              </div>

              <button
                onClick={() => {
                  resetForm();
                  setIsEdit(false);
                  setOpenModal(true);
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl transition-all duration-300"
              >
                + Add Turf
              </button>
            </div>

            {/* GRID */}
            {turfs.length === 0 ? (
              <div className="text-center text-slate-400 py-20">
                No Turf Found
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                {turfs.map((turf) => (
                  <div
                    key={turf.id}
                    className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                  >
                    <img
                      // src={`http://192.168.1.15:4500/uploads/turfs/${turf.cover_image}`}
                      src={`https://turf-backend-mtku.onrender.com/uploads/turfs/${turf.cover_image}`}
                      
                      alt={turf.turf_name}
                      className="w-full h-40 object-cover rounded-xl mb-4"
                    />

                    <div>
                      <h2 className="text-sm font-semibold text-slate-900">
                        {turf.turf_name}
                      </h2>

                      <p className="text-slate-500 text-xs mt-1">
                        📍 {turf.location}
                      </p>

                      <p className="text-slate-500 text-xs">
                        🏏 {turf.sport_type}
                      </p>

                      <p className="text-slate-500 text-xs mt-2">
                        {formatTo12Hour(turf.opening_time)} - {formatTo12Hour(turf.closing_time)}
                      </p>

                      <span className="inline-block mt-3 px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                        {turf.approval_status}
                      </span>
                    </div>

                    <div className="flex gap-2 mt-5">

                      <button
                        onClick={() => handleEdit(turf)}
                        className="flex-1 bg-white border text-slate-700 hover:bg-slate-100 py-2 rounded-xl text-sm transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(turf.id)}
                        className="flex-1 bg-red-50 text-red-600 hover:bg-red-100 py-2 rounded-xl text-sm transition"
                      >
                        Delete
                      </button>

                    </div>

                  </div>
                ))}

              </div>
            )}

            {/* MODAL */}
            <TurfModal
  open={openModal}
  isEdit={isEdit}
  form={form}
  handleChange={handleChange}
  handleSubmit={handleSubmit}
  coverImage={coverImage}
  setCoverImage={setCoverImage}
  setOpenModal={setOpenModal}
/>

          </div>
        </main>
      </div>
    </div>
  );
}