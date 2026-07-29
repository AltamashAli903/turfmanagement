import { useEffect, useState } from "react";
import API from "../api/axios";
import Swal from "sweetalert2";
import Toast from "../components/ui/Toast";
import Table from "../components/ui/Table";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import SlotModal from "../components/Model/SlotModel";

export default function Slots() {
    const [form, setForm] = useState({
        turf_id: "",
        slot_start: "",
        slot_end: "",
        price: ""
    });

    const [errors, setErrors] = useState({});
    const [slots, setSlots] = useState([]);
    const [turfs, setTurfs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedSlotId, setSelectedSlotId] = useState(null);
    const [collapsed, setCollapsed] = useState(false);
    const columns = [
        {
            key: "turf_name",
            title: "Turf",
        },
        {
            key: "location",
            title: "Location",
        },
        {
            key: "slot_start",
            title: "Start Time",
        },
        {
            key: "slot_end",
            title: "End Time",
        },
        {
            key: "price",
            title: "Price",
        },
        {
            key: "status",
            title: "Status",
            align: "text-center",
        },
        {
            key: "actions",
            title: "Actions",
            align: "text-center",
        },
    ];
    const [toast, setToast] = useState({
        show: false,
        message: "",
        type: "success",
    });
    const showToast = (message, type = "success") => {
        setToast({
            show: true,
            message,
            type,
        });
    };
    

    const formatTime = (time) => time?.slice(0, 5);

    const fetchSlots = async () => {
        const owner = JSON.parse(localStorage.getItem("owner"));
        const res = await API.post("/slot/turf", {
            owner_id: owner.id,
        });

        setSlots(res.data || []);
    };

    const fetchTurfs = async () => {
        try {
            const owner = JSON.parse(localStorage.getItem("owner"));

            const res = await API.post("/turf/get-turf", {
                owner_id: owner.id,
            });

            setTurfs(res.data.data || []);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchSlots();
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
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const handleEdit = (slot) => {
        setForm({
            turf_id: slot.turf_id,
            slot_start: slot.slot_start,
            slot_end: slot.slot_end,
            price: slot.price
        });

        setSelectedSlotId(slot.id);
        setIsEdit(true);
        setOpenModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = {};

        if (!form.turf_id) {
            validationErrors.turf_id = "Please Select a turf.";
        }

        if (!form.slot_start) {
            validationErrors.slot_start = "Please Select Start time.";
        }

        if (!form.slot_end) {
            validationErrors.slot_end = "Please Select End time.";
        }

        if (
            form.slot_start &&
            form.slot_end &&
            form.slot_start >= form.slot_end
        ) {
            validationErrors.slot_end = "End time must be greater than start time.";
        }

        if (!form.price) {
            validationErrors.price = "Please Select Slot Price.";
        } else if (Number(form.price) <= 0) {
            validationErrors.price = "Price must be greater than 0.";
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});

        setLoading(true);

        try {
            let res;

            if (isEdit) {
                res = await API.put("/slot/update", {
                    ...form,
                    slot_id: selectedSlotId,
                });
            } else {
                res = await API.post("/slot/create", form);
            }

            const data = res?.data?.[0];
            const ok = data?.success == 1;


            showToast(
                data?.message || (ok ? "Success" : "Something went wrong"),
                ok ? "success" : "error"
            );

            if (ok) {
                setForm({ turf_id: "", slot_start: "", slot_end: "", price: "" });
                setIsEdit(false);
                setOpenModal(false);
                fetchSlots();
            }
        }
        catch (err) {
            showToast(
                err?.response?.data?.message ||
                err?.response?.data?.[0]?.message ||
                "Something went wrong",
                "error"
            );
        }

        setLoading(false);
    };

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Delete Slot?",
            icon: "warning",
            showCancelButton: true
        });

        if (!confirm.isConfirmed) return;

        await API.delete("/slot/delete", {
            data: {
                slot_id: id,
            },
        });
        fetchSlots();
    };

    const toggleAvailability = async (slot) => {
        await API.put("/slot/update-availability", {
            slot_id: slot.id,
            is_active: slot.is_active == 0 ? 1 : 0,
        });
        fetchSlots();
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            <div className="flex-1 flex flex-col">
                <Header setSidebarOpen={setSidebarOpen} />
                <main className="flex-1 bg-white pt-4 pl-8">
                    <div >

                        {/* HEADER */}
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-2xl font-bold text-slate-900">
                                    Slot Management
                                </h1>
                                <p className="text-slate-500 text-sm mt-1">
                                    Create and manage turf time slots
                                </p>
                            </div>

                            <button
                                onClick={() => {
                                    setIsEdit(false);
                                    setForm({ turf_id: "", slot_start: "", slot_end: "", price: "" });
                                    setOpenModal(true);
                                }}
                                className="bg-emerald-900 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl mr-11 mt-4 transition-all duration-300"
                            >
                                + Add 
                            </button>
                        </div>

                        <div className="mr-10 mt-4">

                            <Table
                                columns={columns}
                                data={slots}
                                renderCell={(key, slot) => {
                                    switch (key) {
                                        case "slot_start":
                                            return formatTime(slot.slot_start);

                                        case "slot_end":
                                            return formatTime(slot.slot_end);

                                        case "price":
                                            return `₹${slot.price}`;

                                        case "status":
                                            return (
                                                <button
                                                    onClick={() => toggleAvailability(slot)}
                                                    className={`px-3 py-1 text-xs rounded-full transition font-medium
                                                                ${slot.is_active === 0
                                                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                                                            : "bg-red-100 text-red-700 hover:bg-red-200"
                                                        }`}
                                                >
                                                    {slot.is_active === 0 ? "Available" : "Blocked"}
                                                </button>
                                            );

                                        case "actions":
                                            return (
                                                <div className="flex justify-center gap-2">
                                                    <button
                                                        onClick={() => handleEdit(slot)}
                                                        className="px-3 py-1.5 text-xs rounded-lg bg-white border text-slate-700 hover:bg-slate-100 transition"
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        onClick={() => handleDelete(slot.id)}
                                                        className="px-3 py-1.5 text-xs rounded-lg bg-white border border-red-500 text-red-900 hover:bg-red-50 transition"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            );

                                        default:
                                            return slot[key];
                                    }
                                }}
                            />
                        </div>
                        {/* MODAL */}
                        <SlotModal
                            open={openModal}
                            isEdit={isEdit}
                            form={form}
                            errors={errors}
                            turfs={turfs}
                            loading={loading}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                            setOpenModal={setOpenModal}
                        />

                        {toast.show && (
                            <Toast
                                message={toast.message}
                                type={toast.type}
                                onClose={() =>
                                    setToast((prev) => ({
                                        ...prev,
                                        show: false,
                                    }))
                                }
                            />
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}