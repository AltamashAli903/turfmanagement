import { useEffect, useState } from "react";
import API, { IMAGE_URL } from "../api/axios";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { formatTo12Hour, convertTo24Hour } from "../utils/timeFormat";
import TurfModal from "../components/Model/TurfModel";
import GalleryModal from "../components/Model/GalleryModal";
import { Images } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Turf() {
  const [collapsed, setCollapsed] = useState(false);
  const [turfs, setTurfs] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [coverImage, setCoverImage] = useState(null);
  const navigate = useNavigate();
  const url = ""
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedTurf, setSelectedTurf] = useState(null);

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
  const handleEnter = (e) => {
    if (e.key !== "Enter") return;

    e.preventDefault();

    const elements = [...e.target.form.elements].filter(
      (el) =>
        !el.disabled &&
        el.type !== "hidden" &&
        el.type !== "submit"
    );

    const index = elements.indexOf(e.target);

    if (index > -1 && index < elements.length - 1) {
      elements[index + 1].focus();
    }
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
    fetchTurfs();
  };

  const openGallery = (turf) => {

    setSelectedTurf(turf);

    setGalleryOpen(true);

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
   <div className="flex h-screen overflow-hidden bg-white">
       <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 overflow-y-auto bg-white pl-8 pt-4">
          <div>

            {/* HEADER */}
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Turf Management 
                </h1>
                <p className="text-slate-500 text-sm mt-1">
            Manage all your turfs
          </p>
              </div>

              <button
                onClick={() => {
                  resetForm();
                  setIsEdit(false);
                  setOpenModal(true);
                }}
                // className="bg-emerald-800 hover:bg-emerald-700 mt-5 text-white px-6 mr-10 py-2 rounded-xl transition-all duration-300"
              className="bg-emerald-900 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl mr-11 mt-4 transition-all duration-300"
             >
                + Add 
              </button>
            </div>

            {/* GRID */}
            {/* {turfs.length === 0 ? (
              <div className="text-center text-slate-400 py-20">
                No Turf Found
              </div>
            ) : (
              <div className="grid gap-6 pt-6 sm:grid-cols-2 lg:grid-cols-3">

                {turfs.map((turf) => (
                  <div
                    key={turf.id}
                    className="bg-white border border-slate-200 rounded-2xl p-0.5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                  >
                    <img
                      src={`${IMAGE_URL}/uploads/turfs/${turf.cover_image}`}
                      alt={turf.turf_name}
                      className="w-full h-44 md:h-40 object-cover rounded-xl mb-2"
                    />

                    <div className="p-2">
                      <h2 className="text-xl font-semibold text-slate-900">
                        {turf.turf_name}
                      </h2>

                      <p className="text-slate-500 text-lg mt-1">
                        📍 {turf.location}
                      </p>

                      <p className="text-slate-500 text-lg">
                        🏏 {turf.sport_type}
                      </p>

                      <p className="text-slate-500 text-xs mt-2">
                        {formatTo12Hour(turf.opening_time)} - {formatTo12Hour(turf.closing_time)}
                      </p>

                     </div>

                     <div className="grid grid-cols-3 gap-2 mt-1 pb-5 pl-5 pr-5 pt-0">
                      <button
                        onClick={() => handleEdit(turf)}
                        className="rounded-xl border py-2 hover:bg-slate-100"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(turf.id)}
                        className="rounded-xl bg-red-50 text-red-600 hover:bg-red-100"
                      >
                        Delete
                      </button>

                      <button
                        onClick={() =>
                          navigate(`/turf/gallery/${turf.id}`, {
                            state: {
                              turfName: turf.turf_name,
                            },
                          })
                        }
                        className="flex items-center justify-center gap-2 rounded-xl border border-emerald-900 py-2 text-emerald-900 hover:bg-emerald-50 transition"
                      >
                        <Images size={16} />
                        Gallery
                      </button>

                    </div>

                  </div>
                ))}

              </div>
            )} */}

            {/* <div className="mt-6 space-y-5 mr-10"> */}
           <div className="mt-6 mr-10 space-y-5 rounded-2xl border-2 border-emerald-800 bg-white shadow-sm">
    {turfs.map((turf) => (
        <div
            key={turf.id}
            className="flex items-center gap-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition"
        >

            {/* Image */}

            <img
                src={`${IMAGE_URL}/uploads/turfs/${turf.cover_image}`}
                className="h-60 w-72 rounded-xl object-cover flex-shrink-0"
            />

            {/* Details */}

            <div className="flex-1">

                <div className="flex justify-between">

                    <div>

                        <h2 className="text-2xl font-bold">
                            {turf.turf_name}
                        </h2>

                        <p className="mt-3 text-slate-600">
                            📍 {turf.location}
                        </p>

                        <p className="mt-2 text-slate-600">
                            🏏 {turf.sport_type}
                        </p>

                        <p className="mt-2 text-slate-600">
                            🕒 {formatTo12Hour(turf.opening_time)}
                            {" - "}
                            {formatTo12Hour(turf.closing_time)}
                        </p>

                        <p className="mt-4 text-slate-500 line-clamp-2">
                            {turf.description}
                        </p>

                    </div>

                </div>

                {/* Buttons */}

                <div className="mt-6 flex gap-3">

                    <button
                        onClick={() => handleEdit(turf)}
                        className="rounded-xl bg-emerald-800 px-5 py-2 text-white hover:bg-emerald-700"
                    >
                        Edit
                    </button>

                    <button
                        onClick={() =>
                            navigate(`/turf/gallery/${turf.id}`, {
                                state: {
                                    turfName: turf.turf_name,
                                },
                            })
                        }
                        className="rounded-xl border border-emerald-800 px-5 py-2 text-emerald-800 hover:bg-emerald-50"
                    >
                        Gallery
                    </button>

                    <button
                        onClick={() => handleDelete(turf.id)}
                        className="rounded-xl bg-red-500 px-5 py-2 text-white hover:bg-red-600"
                    >
                        Delete
                    </button>

                </div>

            </div>

        </div>
    ))}
</div>

            {/* MODAL */}
            <TurfModal
              open={openModal}
              isEdit={isEdit}
              form={form}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              handleEnter={handleEnter}
              coverImage={coverImage}
              setCoverImage={setCoverImage}
              setOpenModal={setOpenModal}
            />

            <GalleryModal
              open={galleryOpen}
              turf={selectedTurf}
              setOpen={setGalleryOpen}
            />

          </div>
        </main>
      </div>
    </div>
  );
}