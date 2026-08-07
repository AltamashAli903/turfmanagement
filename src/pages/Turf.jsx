import { useEffect, useState } from "react";
import { formatTo12Hour, convertTo24Hour } from "../utils/timeFormat";
import { Images, CalendarDays } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CarFront, Toilet, GlassWater, Coffee, LockKeyhole } from "lucide-react";
import API, { IMAGE_URL } from "../api/axios";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import TurfModal from "../components/Model/TurfModel";
import GalleryModal from "../components/Model/GalleryModal";
import Toast from "../components/Ui/Toast";
import HolidayModal from "../components/Model/HolidayModal";
import CustomizedAlert from "../components/Ui/CustomizedAlert";

export default function Turf() {
  const [toast, setToast] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const [turfs, setTurfs] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [coverImage, setCoverImage] = useState(null);
  const navigate = useNavigate();
  const url = ""
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("facilities");
  const [holidays, setHolidays] = useState({});
  const [holidayModal, setHolidayModal] = useState(false);
  const [selectedTurf, setSelectedTurf] = useState(null);
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [form, setForm] = useState({
    turf_id: "",
    turf_name: "",
    sport_type: "",
    location: "",
    address: "",
    description: "",
    opening_time: "",
    closing_time: "",
    cover_image: "",
    facilities: [],
    selectedFacility: "",
  });

  const [alert, setAlert] = useState({
    open: false,
    type: "delete",
    title: "",
    message: "",
    onConfirm: null,
  });

  const facilityIcons = {
    Parking: CarFront,
    Washroom: Toilet,
    "Drinking Water": GlassWater,
    Cafeteria: Coffee,
    Locker: LockKeyhole,
  };

  const fetchTurfs = async () => {
    try {
      const owner = JSON.parse(localStorage.getItem("owner"));

      const res = await API.post("/turf/get-turf", {
        owner_id: owner.id,
      });

      const turfList = Array.isArray(res.data.data) ? res.data.data : [];

      setTurfs(turfList);

      turfList.forEach((turf) => {
        fetchHoliday(turf.id);
      });

    } catch (err) {
      console.error(err);
    }
  };

  const fetchHoliday = async (turfId) => {
    try {
      const today = new Date();

      const payload = {
        turf_id: turfId,
        month: today.getMonth() + 1,
        year: today.getFullYear(),
      };

      const res = await API.post("/holiday/list", payload);

      setHolidays((prev) => ({
        ...prev,
        [turfId]: res.data.data || [],
      }));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchHoliday();
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
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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
    formData.append(
      "facilities",
      JSON.stringify(form.facilities)
    );

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
      setToast({
        message:
          err.response?.data?.message || "Something went wrong",
        type: "error",
      });
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
      cover_image: turf.cover_image || "",
      facilities: Array.isArray(turf.facilities)
        ? turf.facilities
        : typeof turf.facilities === "string"
          ? (() => {
            try {
              return JSON.parse(turf.facilities);
            } catch {
              return turf.facilities.split(",");
            }
          })()
          : [],
      selectedFacility: "",
      customFacility: "",
    });

    setCoverImage(null);
    setIsEdit(true);
    setOpenModal(true);
  };

  const handleDelete = (id) => {
    setAlert({
      open: true,
      type: "delete",
      title: "Delete Turf?",
      message: "Are you sure you want to delete this turf? This action cannot be undone.",
      onConfirm: async () => {
        try {
          await API.put("/turf/delete", {
            data: {
              turf_id: id,
            },
          });

          fetchTurfs();

          showToast("Turf deleted successfully.", "success");
        } catch (err) {
          showToast(
            err?.response?.data?.message || "Failed to delete turf.",
            "error"
          );
        } finally {
          setAlert((prev) => ({
            ...prev,
            open: false,
          }));
        }
      },
    });
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
      description: "",
      opening_time: "",
      closing_time: "",
      cover_image: "",
      facilities: [],
      selectedFacility: "",
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

            <div className="mt-6 mr-10 space-y-5 rounded-2xl border-2 border-emerald-800 bg-white shadow-sm">

              {turfs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-25">
                  <div className="text-5xl mb-2">
                    🏟️
                  </div>

                  <h2 className="text-xl font-semibold text-slate-700">
                    No Turf Found
                  </h2>

                  <p className="text-slate-500 mt-2">
                    You haven't added any turf yet.
                  </p>

                
                </div>
              ) : (

                turfs.map((turf) => (
                  <div
                    key={turf.id}
                    className="flex items-center gap-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition"
                  >

                    {/* Image */}

                    <img
                      src={`${IMAGE_URL}/uploads/turfs/${turf.cover_image}`}
                      className="h-64 w-72 rounded-xl object-cover flex-shrink-0"
                    />

                    {/* Details */}

                    <div className="flex-1">
                      <div className="flex justify-between gap-6">

                        {/* Left Side */}
                        <div className="flex-1">
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

                          <p className="mt-4 mb-8 text-slate-500">
                            {turf.description}
                          </p>
                        </div>

                        {/* Right Side */}
                        <div className="w-64">
                          <div className="">
                            <button
                              onClick={() => setActiveTab("facilities")}
                              className={`flex-1 rounded-lg px-3 py-1 transition
            ${activeTab === "facilities"
                                  ? "bg-white shadow text-emerald-700 font-semibold"
                                  : "text-slate-500"}`}
                            >
                              Facilities
                            </button>

                            <button
                              onClick={() => setActiveTab("holidays")}
                              className={`flex-1 rounded-lg px-3 py-1 transition
            ${activeTab === "holidays"
                                  ? "bg-white shadow text-emerald-700 font-semibold"
                                  : "text-slate-500"}`}
                            >
                              Holidays
                            </button>
                          </div>

                          <div className="mt-4">

                            {activeTab === "facilities" ? (
                              (() => {
                                const facilities = Array.isArray(turf.facilities)
                                  ? turf.facilities
                                  : typeof turf.facilities === "string"
                                    ? JSON.parse(turf.facilities)
                                    : [];

                                if (!facilities.length) {
                                  return (
                                    <p className="text-slate-400">
                                      No Facilities Available
                                    </p>
                                  );
                                }

                                return facilities.map((facility, index) => {
                                  const Icon = facilityIcons[facility];

                                  return (
                                    <div
                                      key={index}
                                      className="flex items-center gap-3 text-slate-600"
                                    >
                                      {Icon && (
                                        <Icon
                                          size={18}
                                          className=""
                                        />
                                      )}

                                      <span className="text-sm pt-1.5">
                                        {facility}
                                      </span>
                                    </div>
                                  );
                                });
                              })()

                            ) : (
                              <div className="rounded-xl border border-slate-200 p-4">

                                <div className="flex justify-between items-center">

                                  <h3 className="flex items-center gap-2 font-semibold">
                                    <CalendarDays size={18} />
                                    Holidays
                                  </h3>

                                  <button
                                    onClick={() => {
                                      setSelectedTurf(turf);
                                      setHolidayModal(true);
                                    }}
                                    className="group relative inline-block transform font-medium text-slate-800 transition-all duration-300 hover:scale-108"
                                  >
                                    Manage

                                    <span className="absolute -bottom-1 left-0 h-0.5 w-0 rounded-full bg-emerald-600 transition-all duration-300 ease-out group-hover:w-full" />
                                  </button>

                                </div>

                                {(() => {

                                  const data = holidays[turf.id] || [];

                                  const weeklyOff = data.find(
                                    (x) => x.type === "WEEKLY_OFF"
                                  );

                                  const holidayCount = data.filter(
                                    (x) => x.type !== "WEEKLY_OFF"
                                  ).length;

                                  return (
                                    <div className="mt-3 space-y-2.5">

                                      <div className="flex justify-between">

                                        <span className="text-slate-500">
                                          Weekly Off
                                        </span>

                                        <span className="font-medium">
                                          {weeklyOff
                                            ? weekDays[weeklyOff.weekly_off_day]
                                            : "-"}
                                        </span>

                                      </div>

                                      <div className="flex justify-between">

                                        <span className="text-slate-500">
                                          Holidays
                                        </span>

                                        <span className="font-medium">
                                          {holidayCount}
                                        </span>

                                      </div>

                                    </div>
                                  );

                                })()}

                              </div>

                            )}

                          </div>
                        </div>

                      </div>

                      {/* Buttons */}
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleEdit(turf)}
                          className="rounded-xl bg-emerald-800 px-5 py-2 text-white hover:bg-emerald-700"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            navigate(`/turf/gallery/${turf.id}`, {
                              state: { turfName: turf.turf_name },
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
                ))
              )}

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
            <CustomizedAlert
              open={alert.open}
              type={alert.type}
              title={alert.title}
              message={alert.message}
              onConfirm={alert.onConfirm}
              onClose={() =>
                setAlert((prev) => ({
                  ...prev,
                  open: false,
                }))
              }
            />
            <HolidayModal
              open={holidayModal}
              setOpen={setHolidayModal}
              turf={selectedTurf}
              onSuccess={() => {
                fetchHoliday(selectedTurf.id);
              }}
            />

            {toast && (
              <Toast
                message={toast.message}
                type={toast.type}
                onClose={() => setToast(null)}
              />
            )}

          </div>
        </main>
      </div>
    </div>
  );
}