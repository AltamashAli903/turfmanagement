import { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import API from "../api/axios";
import BookingModal from "../components/Model/BookingModal";
import Loader from "../components/UI/Loader";
import Toast from "../components/UI/Toast";
import Table from "../components/UI/Table";
import { formatTo12Hour } from "../utils/TimeFormat";

export default function Bookings() {
    const [collapsed, setCollapsed] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [bookings, setBookings] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("ALL");
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const columns = [
        { key: "customer_name", title: "Customer" },
        { key: "customer_phone", title: "Phone" },
        { key: "turf_name", title: "Turf" },
        { key: "slot", title: "Slot" },
        { key: "booking_date", title: "Date" },
        { key: "payment_status", title: "Payment" },
        { key: "booking_status", title: "Status" },
        { key: "actions", title: "Actions", align: "text-center" },
    ];
    useEffect(() => {
        fetchBookings();
    }, []);

    const [form, setForm] = useState({
        turf_id: "",
        slot_id: "",
        booking_date: "",
        customer_name: "",
        customer_phone: "",
        payment_status: "paid",
        booking_status: "pending",
    });

    const updateBookingStatus = async (bookingId, bookingStatus) => {
        try {
            await API.put("/booking/status", {
                booking_id: bookingId,
                booking_status: bookingStatus,
            });

            fetchBookings();

            setToast({
                type: "success",
                message: "Booking status updated.",
            });

        } catch (err) {
            setToast({
                type: "error",
                message: "Unable to update booking status.",
            });
        }
    };

    const updatePaymentStatus = async (bookingId, paymentStatus) => {
        try {
            await API.put("/booking/payment-status", {
                booking_id: bookingId,
                payment_status: paymentStatus,
            });

            fetchBookings();

            setToast({
                type: "success",
                message: "Payment status updated.",
            });

        } catch (err) {
            setToast({
                type: "error",
                message: "Unable to update payment status.",
            });
        }
    };
    const handleEnter = (e) => {
        if (e.key !== "Enter") return;

        e.preventDefault();

        const form = e.target.form;
        const index = [...form.elements].indexOf(e.target);

        form.elements[index + 1]?.focus();
    };

    useEffect(() => {
        filterData();
    }, [search, status, bookings]);



    const fetchBookings = async () => {
        try {
            setLoading(true);

            const owner = JSON.parse(localStorage.getItem("owner"));

            const response = await API.post("/booking/owner-list", {
                owner_id: owner.id,
            });

            if (response.data.success) {
                setBookings(response.data.data);
            } else {
                setToast({
                    message: "Unable to load bookings.",
                    type: "error",
                });
            }
        } catch (error) {
            setToast({
                message:
                    error.response?.data?.message ||
                    "Something went wrong.",
                type: "error",
            });
        } finally {
            setLoading(false);
        }
    };

    const filterData = () => {
        let data = bookings;

        if (search) {
            data = data.filter(
                (b) =>
                    b.customer_name
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                    b.customer_phone.includes(search)
            );
        }

        if (status !== "ALL") {
            data = data.filter(
                (b) => b.booking_status === status.toLowerCase()
            );
        }

        setFiltered(data);
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
                <Header
                    setSidebarOpen={setSidebarOpen} />

                <main className="flex-1 overflow-y-auto bg-white p-4 md:p-6 lg:p-8">
                    <div className="space-y-6">

                        <div className="mr-0 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                            {/* Search + Filter */}
                            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">

                                <input
                                    type="text"
                                    placeholder="Search Customer..."
                                    className="w-full sm:w-72 rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-100"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />

                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="w-full sm:w-48 rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-100"
                                >
                                    <option value="ALL">All</option>
                                    <option value="confirmed">Confirmed</option>
                                    <option value="pending">Pending</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>

                            </div>

                            {/* Button */}
                            <button
                                onClick={() => setOpenModal(true)}
                                className="w-full sm:w-auto rounded-xl bg-emerald-900 px-5 py-3 text-white font-medium hover:bg-emerald-700 transition"
                            >
                                + Add Booking
                            </button>

                        </div>




                        {/* TABLE WRAPPER */}
                        {/* <div className="mr-10 mb-5"> */}
                        <div className="mb-5 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">

                            {loading ? (
                                <div className="flex-1 flex items-center justify-center text-slate-500">
                                    <Loader text="Loading Bookings..." />
                                </div>
                            ) : filtered.length === 0 ? (
                                <div className="flex-1 flex items-center justify-center text-slate-400 py-10">
                                    No bookings found
                                </div>
                            ) : (
                      <div className="overflow-x-auto">

                                    <Table
                                        columns={columns}
                                        data={filtered}
                                        emptyMessage="No bookings found."
                                        renderCell={(key, row) => {
                                            switch (key) {
                                                case "booking_date":

                                                    return new Date(row.booking_date)
                                                        .toLocaleDateString("en-IN", {
                                                            day: "2-digit",
                                                            month: "short",
                                                            year: "numeric"
                                                        });

                                                case "slot":
                                                    return `${formatTo12Hour(row.slot_start)} - ${formatTo12Hour(row.slot_end)}`;

                                                case "booking_status":
                                                    return (
                                                        <button
                                                            onClick={() =>
                                                                updateBookingStatus(
                                                                    row.id,
                                                                    row.booking_status === "pending"
                                                                        ? "confirmed"
                                                                        : row.booking_status === "confirmed"
                                                                            ? "cancelled"
                                                                            : "pending"
                                                                )
                                                            }
                                                            className={`px-3 py-1 text-xs rounded-full font-medium transition
                                                                    ${row.booking_status === "confirmed"
                                                                    ? "bg-green-100 text-green-700 hover:bg-green-200"
                                                                    : row.booking_status === "pending"
                                                                        ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                                                                        : "bg-red-100 text-red-700 hover:bg-red-200"
                                                                }`}
                                                        >
                                                            {row.booking_status === "confirmed"
                                                                ? "Confirmed"
                                                                : row.booking_status === "pending"
                                                                    ? "Pending"
                                                                    : "Cancelled"}
                                                        </button>
                                                    );
                                                case "payment_status":
                                                    return (
                                                        <button
                                                            onClick={() =>
                                                                updatePaymentStatus(
                                                                    row.id,
                                                                    row.payment_status === "pending"
                                                                        ? "paid"
                                                                        : "pending"
                                                                )
                                                            }
                                                            className={`px-3 py-1 text-xs rounded-full font-medium transition
                                                                     ${row.payment_status === "paid"
                                                                    ? "bg-green-100 text-green-700 hover:bg-green-200"
                                                                    : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                                                                }`}
                                                        >
                                                            {row.payment_status === "paid"
                                                                ? "Paid"
                                                                : "Pending"}
                                                        </button>
                                                    ); return (
                                                        <button
                                                            onClick={() =>
                                                                updateBooking(
                                                                    row.id,
                                                                    row.booking_status,
                                                                    row.payment_status === "pending"
                                                                        ? "paid"
                                                                        : row.payment_status === "paid"
                                                                            ? "failed"
                                                                            : "pending"
                                                                )
                                                            }
                                                            className={`px-3 py-1 text-xs rounded-full font-medium transition
                                             ${row.payment_status === "paid"
                                                                    ? "bg-green-100 text-green-700 hover:bg-green-200"
                                                                    : row.payment_status === "pending"
                                                                        ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                                                                        : "bg-red-100 text-red-700 hover:bg-red-200"
                                                                }`}
                                                        >
                                                            {row.payment_status === "paid"
                                                                ? "Paid"
                                                                : row.payment_status === "pending"
                                                                    ? "Pending"
                                                                    : "Failed"}
                                                        </button>
                                                    );
                                                case "actions":
                                                    return (
                                                        <button
                                                            onClick={() => editBooking(row)}
                                                            className="rounded-lg bg-emerald-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
                                                        >
                                                            Edit
                                                        </button>
                                                    );

                                                default:
                                                    return row[key];
                                            }
                                        }}
                                    />

                                </div>
                            )}

                        </div>
                        {toast && (
                            <Toast
                                message={toast.message}
                                type={toast.type}
                                onClose={() => setToast(null)}
                            />
                        )}
                        <BookingModal
                            open={openModal}
                            onClose={() => setOpenModal(false)}
                            fetchBookings={fetchBookings}
                            setToast={setToast}
                            handleEnter={handleEnter}
                        />
                    </div>
                </main>

            </div>
        </div>

    );
}