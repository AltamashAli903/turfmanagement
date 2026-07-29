import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { X, ChevronLeft, ChevronRight, MapPin, Clock, CheckCircle2, Clock3, BadgeIndianRupee } from "lucide-react";
import { formatTo12Hour } from "../../utils/TimeFormat";
import API, { IMAGE_URL } from "../../api/axios";

export default function SlotAvailabilityModal({
    turf,
    onClose,
}) {
    /* ==========================================================
        STATES
    ========================================================== */

    const [step, setStep] = useState("details");
    const [slots, setSlots] = useState([]);
    const [slotLoading, setSlotLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [customer, setCustomer] = useState({
        name: "",
        phone: "",
    });
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [gallery, setGallery] = useState([]);

    const fetchAvailableSlots = async (date) => {
        try {

            setSlotLoading(true);

            const res = await API.post("/booking/available-slots", {
                turf_id: turf.id,
                booking_date: date,
            });

            if (res.data.success) {
                setSlots(res.data.data || []);
            } else {
                setSlots([]);
            }

        } catch (err) {
            console.error(err);
            setSlots([]);
        } finally {
            setSlotLoading(false);
        }
    };


    const createBooking = async () => {
        try {
            const res = await API.post("/booking/create", {
                turf_id: turf.id,
                slot_id: selectedSlot.id,
                booking_date: selectedDate
                    .toISOString()
                    .split("T")[0],
                customer_name: customer.name,
                customer_phone: customer.phone,
                payment_status: "pending"
            });
            if (res.data.booking_id) {
                setBookingSuccess(true);
                setStep("success");
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (turf?.id) {
            loadGallery();
        }
    }, [turf]);

    /* ==========================================================
        GALLERY
    ========================================================== */

    const loadGallery = async () => {
        try {
            const res = await API.post("/turf/gallery/list", {
                turf_id: turf.id,
            });

            setGallery(res.data.data || []);
        } catch (err) {
            console.error(err);
        }
    };

    /* ==========================================================
        FUNCTIONS
    ========================================================== */

    const nextStep = () => {
        if (step === "details") setStep("date");
        else if (step === "date") setStep("customer");
        else if (step === "customer") setStep("summary");
        else if (step === "summary") setStep("success");
        else if (step === "customer") setStep("summary");
        else if (step === "summary") {
            createBooking();
            setBookingSuccess(true);
            setStep("success");
        }
    };

    const prevStep = () => {
        if (step === "date") setStep("details");
        if (step === "customer") setStep("date");
        if (step === "summary") setStep("customer");
        if (step === "success") setStep("summary");
        else if (step === "summary") setStep("customer");
    };

    /* ==========================================================
        STEP INDICATOR
    ========================================================== */

    const steps = [
        "details",
        "date",
        "customer",
        "summary",
    ];

    const titles = {
        details: "View Turf",
        date: "Choose Date",
        customer: "Fill Information",
        summary: "Confirmation",
        success: "Completed",
    };

    /* ==========================================================
        RETURN
    ========================================================== */

    return (
        <div className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-5">

            <div className="relative bg-white w-full h-[90vh] max-w-4xl rounded-3xl overflow-hidden shadow-2xl">

                {/* Close */}

                <button
                    onClick={onClose}
                    className="absolute right-5 top-3 z-50 h-10 w-10 rounded-full bg-white shadow flex items-center justify-center hover:bg-red-500 hover:text-white"
                >
                    <X size={20} />
                </button>

                {/* Header + Step Indicator */}

                <div className="border-b px-8 py-4 flex items-center justify-between">

                    {/* Left */}

                    <div>
                        <h2 className="text-2xl font-bold mr-3">
                            Book Turf
                        </h2>

                    </div>

                    {/* Right */}

                    <div className="flex items-center gap-4 pr-12">

                        {steps.map((item, index) => {

                            const active = steps.indexOf(step) >= index;

                            return (
                                <div
                                    key={item}
                                    className="flex items-center gap-2"
                                >

                                    <div
                                        className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold
                                                ${active
                                                ? "bg-emerald-600 text-white"
                                                : "bg-slate-200 text-slate-500"
                                            }`}
                                    >
                                        {active ? (
                                            <CheckCircle2 size={16} />
                                        ) : (
                                            index + 1
                                        )}
                                    </div>

                                    <span className="hidden lg:block text-xs font-medium whitespace-nowrap">
                                        {titles[item]}
                                    </span>

                                    {index !== steps.length - 1 && (
                                        <div className="w-8 h-[2px] bg-slate-300" />
                                    )}

                                </div>
                            );

                        })}

                    </div>

                </div>

                {/* Main */}

                <div className="p-6">

                    {step === "details" && (

                        <div className="grid lg:grid-cols-2 gap-8">

                            {/* Gallery */}

                            <div>

                                <img
                                    src={
                                        gallery.length > 0
                                            ? `${IMAGE_URL}${gallery[selectedImage].image_path}`
                                            : `${IMAGE_URL}${turf.cover_image}`
                                    }
                                    className="w-full h-[250px] rounded-2xl object-cover"
                                    alt=""
                                />

                                <div className="grid grid-cols-4 gap-3 mt-4">

                                    {gallery.map((img, i) => (

                                        <img
                                            key={img.id}
                                            src={`${IMAGE_URL}${img.image_path}`}
                                            alt=""
                                            onClick={() => setSelectedImage(i)}
                                            className={`h-20 w-full rounded-xl object-cover cursor-pointer border-4 transition
                                                    ${selectedImage === i
                                                    ? "border-emerald-500"
                                                    : "border-transparent"
                                                }`}
                                        />

                                    ))}

                                </div>

                            </div>

                            {/* Details */}

                            <div className="flex flex-col">

                                <h2 className="text-3xl font-bold">

                                    {turf.turf_name}

                                </h2>

                                <div className="flex items-center gap-2 mt-5 text-slate-600">

                                    <MapPin
                                        size={20}
                                        className="text-emerald-600"
                                    />

                                    {turf.location}

                                </div>

                                <div className="flex items-center gap-2 mt-4 text-slate-600">

                                    <Clock
                                        size={20}
                                        className="text-emerald-600"
                                    />

                                    {formatTo12Hour(
                                        turf.opening_time
                                    )}{" "}
                                    -

                                    {formatTo12Hour(
                                        turf.closing_time
                                    )}

                                </div>

                                <div className="mt-8">

                                    <h3 className="font-semibold text-lg">
                                        About Turf
                                    </h3>

                                    <p className="text-slate-600 leading-7 mt-3">
                                        {turf.description ||
                                            "Premium sports turf with high-quality playing surface, flood lights, parking, washrooms and refreshment facilities."}
                                    </p>

                                </div>

                                <div className="mt-auto flex justify-end pt-10">

                                    <button
                                        onClick={nextStep}
                                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl flex items-center gap-2"
                                    >
                                        Continue

                                        <ChevronRight size={18} />
                                    </button>

                                </div>

                            </div>

                        </div>

                    )}

                    {/* ==========================================================
                        STEP 2 - DATE SELECTION
                        ========================================================== */}

                    {step === "date" && (
                        <div className="grid lg:grid-cols-[320px_1fr] gap-4 items-start">

                            {/* LEFT SIDE */}

                            <div>

                                <div className="rounded-2xl border p-3 shadow-sm max-w-[300px]">

                                    <h3 className="text-xl font-semibold mb-5">
                                        Select Booking Date
                                    </h3>

                                    <Calendar

                                        value={selectedDate}
                                        onChange={(date) => {
                                            console.log("Calendar clicked", date);
                                            setSelectedDate(date);
                                            setSelectedSlot(null);
                                            fetchAvailableSlots(
                                                date.toISOString().split("T")[0]
                                            );
                                        }} minDate={new Date()}
                                    />

                                </div>

                            </div>

                            {/* RIGHT SIDE */}

                            <div>

                                {!selectedDate ? (

                                    <div className="h-full rounded-2xl border flex items-center justify-center text-slate-500">

                                        Select a date to view available slots

                                    </div>

                                ) : (

                                    <>
                                        <div className="flex flex-col h-full">

                                            <h2 className="text-2xl font-bold mb-6">
                                                Available Slots
                                            </h2>

                                            {slotLoading ? (

                                                <div className="flex justify-center items-center h-64">

                                                    <p className="text-slate-500">
                                                        Loading slots...
                                                    </p>

                                                </div>

                                            ) : slots.length === 0 ? (

                                                <div className="flex justify-center items-center h-64 rounded-xl border">

                                                    <p className="text-slate-500">
                                                        No slots available for this date.
                                                    </p>

                                                </div>

                                            ) : (

                                                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                                                    {slots.map((slot) => {
                                                        const selected = selectedSlot?.id === slot.id;

                                                        return (
                                                            <button
                                                                key={slot.id}
                                                                onClick={() => setSelectedSlot(slot)}
                                                                className={`
                                                                            relative
                                                                            rounded-2xl
                                                                            border
                                                                            px-3
                                                                            py-2
                                                                            bg-white
                                                                            transition-all
                                                                            duration-300
                                                                            hover:-translate-y-1
                                                                            hover:shadow-lg

                                                                            ${selected
                                                                        ? "border-emerald-500 bg-emerald-50 shadow-md"
                                                                        : "border-slate-200 hover:border-emerald-400"
                                                                    }
  `}
                                                            >
                                                                {/* Selected Badge */}
                                                                {selected && (
                                                                    <div className="absolute -top-2 -right-2">
                                                                        <div className="h-6 w-6 rounded-full bg-emerald-600 flex items-center justify-center shadow">
                                                                            <CheckCircle2 size={14} className="text-white" />
                                                                        </div>
                                                                    </div>
                                                                )}

                                                                {/* Time */}
                                                                <div className="flex items-center gap-2">
                                                                    <Clock3
                                                                        size={16}
                                                                        className="text-emerald-600"
                                                                    />

                                                                    <span className="font-semibold text-[10px]">
                                                                        {formatTo12Hour(slot.slot_start)}
                                                                        {" - "}
                                                                        {formatTo12Hour(slot.slot_end)}
                                                                    </span>
                                                                </div>

                                                                {/* Divider */}
                                                                <div className="border-t border-dashed border-slate-200 my-3"></div>

                                                                {/* Price */}
                                                                <div className="flex items-center justify-between">
                                                                    <div className="flex items-center gap-2 text-[10px] text-emerald-700 font-bold">
                                                                        <BadgeIndianRupee size={14} />
                                                                        ₹{slot.price}
                                                                    </div>

                                                                    <span
                                                                        className={`
                                                                                    text-[8px]
                                                                                    px-2
                                                                                    py-1
                                                                                    rounded-full
                                                                                    ${selected
                                                                                ? "bg-emerald-600 text-white"
                                                                                : "bg-emerald-100 text-emerald-700"
                                                                            }`}
                                                                    >
                                                                        {selected ? "Selected" : "Available"}
                                                                    </span>
                                                                </div>
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            )}

                                        </div>

                                    </>

                                )}

                            </div>

                            {/* Footer */}

                            <div className="lg:col-span-2 mt-0 flex justify-between">

                                <button
                                    onClick={prevStep}
                                    className="px-6 py-1 border rounded-xl"
                                >
                                    Back
                                </button>

                                <button
                                    disabled={!selectedSlot}
                                    onClick={nextStep}
                                    className={`px-6 py-1.5 rounded-xl text-white
                                            ${selectedSlot
                                            ? "bg-emerald-600"
                                            : "bg-gray-300 cursor-not-allowed"
                                        }`}
                                >
                                    Continue
                                </button>

                            </div>

                        </div>
                    )}

                    {/* ==========================================================
                        STEP 3 - CUSTOMER DETAILS
                        ========================================================== */}

                    {step === "customer" && (
                        <div className="max-w-2xl mx-auto">

                            <h2 className="text-2xl font-bold mb-2">
                                Customer Details
                            </h2>

                            <p className="text-slate-500 mb-8">
                                Please enter your booking information.
                            </p>

                            <div className="space-y-6">

                                <div>
                                    <label className="block text-sm font-semibold mb-2">
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        value={customer.name}
                                        onChange={(e) =>
                                            setCustomer({
                                                ...customer,
                                                name: e.target.value,
                                            })
                                        }
                                        placeholder="Enter your name"
                                        className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2">
                                        Phone Number
                                    </label>

                                    <input
                                        type="tel"
                                        maxLength={10}
                                        value={customer.phone}
                                        onChange={(e) =>
                                            setCustomer({
                                                ...customer,
                                                phone: e.target.value.replace(/\D/g, ""),
                                            })
                                        }
                                        placeholder="Enter phone number"
                                        className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none"
                                    />
                                </div>

                            </div>

                            <div className="mt-5 flex justify-between">

                                <button
                                    onClick={prevStep}
                                    className="px-1 pr-4 py-1.5 rounded-xl border hover:bg-slate-100 flex items-center gap-2"
                                >
                                    <ChevronLeft size={18} />
                                    Back
                                </button>

                                <button
                                    disabled={
                                        customer.name.trim() === "" ||
                                        customer.phone.length !== 10
                                    }
                                    onClick={nextStep}
                                    className={`px-1 pl-3 py-1.5 rounded-xl flex items-center gap-2 text-white ${customer.name.trim() !== "" &&
                                        customer.phone.length === 10
                                        ? "bg-emerald-600 hover:bg-emerald-700"
                                        : "bg-slate-300 cursor-not-allowed"
                                        }`}
                                >
                                    Continue
                                    <ChevronRight size={18} />
                                </button>

                            </div>

                        </div>
                    )}

                    {/* ==========================================================
                        STEP 4 - BOOKING SUMMARY
                        ========================================================== */}

                    {step === "summary" && (
                        <div className="max-w-3xl mx-auto">

                            <h2 className="text-2xl font-bold mb-2">
                                Booking Summary
                            </h2>

                            <div className="rounded-2xl border border-slate-200 overflow-hidden">

                                <div className="bg-emerald-600 text-white p-3">

                                    <h3 className="text-lg font-semibold">
                                        {turf.turf_name}
                                    </h3>

                                </div>

                                <div className="pl-6 pt-2 space-y-3">

                                    <div className="flex justify-between">
                                        <span className="text-slate-500">
                                            Location
                                        </span>

                                        <span className="font-semibold pr-5">
                                            {turf.location}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-slate-500">
                                            Date
                                        </span>

                                        <span className="font-semibold pr-5">
                                            {selectedDate.toDateString()}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-slate-500">
                                            Slot
                                        </span>

                                        <span className="font-semibold pr-5">
                                            {formatTo12Hour(selectedSlot.start)} -{" "}
                                            {formatTo12Hour(selectedSlot.end)}
                                        </span>
                                    </div>

                                    <div className="flex justify-between ">
                                        <span className="text-slate-500">
                                            Customer
                                        </span>

                                        <span className="font-semibold pr-5">
                                            {customer.name}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-slate-500">
                                            Phone
                                        </span>

                                        <span className="font-semibold pr-5">
                                            {customer.phone}
                                        </span>
                                    </div>

                                    <div className="flex justify-between mb-2">
                                        <span className="text-slate-500">
                                            Booking Status
                                        </span>

                                        <span className="px-3 mr-4 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-semibold">
                                            Pending
                                        </span>
                                    </div>

                                </div>

                            </div>

                            <div className="mt-5 flex justify-between">

                                <button
                                    onClick={prevStep}
                                    className="px-1 pr-4 py-1.5 rounded-xl border hover:bg-slate-100 flex items-center gap-1"
                                >
                                    <ChevronLeft size={18} />
                                    Back
                                </button>

                                <button
                                    onClick={nextStep}
                                    className="px-5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2"
                                >
                                    Confirm Booking
                                    {/* <CheckCircle2 size={18} /> */}
                                </button>

                            </div>

                        </div>
                    )}

                    {/* ==========================================================
                        STEP 5 - SUCCESS
                        ========================================================== */}

                    {step === "success" && (
                        <div className="flex flex-col items-center justify-center py-0">

                            <h2 className="flex mt-0 text-3xl font-bold">
                                Booking Submitted
                                <div className="h-8 w-8 rounded-full mt-1 ml-2 bg-emerald-100 flex items-center justify-center">

                                    <CheckCircle2
                                        size={25}
                                        className="text-emerald-600"
                                    />

                                </div>
                            </h2>

                            <p className="text-slate-500 mt-3 text-center max-w-lg">
                                Your booking request has been submitted successfully.
                                Our team will verify the slot and confirm your booking shortly.
                            </p>

                            <div className="mt-6 rounded-xl text-xl bg-slate-50 border p-3 w-full max-w-lg">

                                <div className="flex justify-between mb-3">
                                    <span>Turf</span>
                                    <span>{turf.turf_name}</span>
                                </div>

                                <div className="flex justify-between mb-3">
                                    <span>Date</span>
                                    <span>{selectedDate.toDateString()}</span>
                                </div>

                                <div className="flex justify-between mb-3">
                                    <span>Slot</span>
                                    <strong>
                                        {formatTo12Hour(selectedSlot.start)} -{" "}
                                        {formatTo12Hour(selectedSlot.end)}
                                    </strong>
                                </div>

                                <div className="flex justify-between">
                                    <span>Status</span>

                                    <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-semibold">
                                        Pending
                                    </span>
                                </div>

                            </div>

                            <button
                                onClick={onClose}
                                className="mt-4 px-5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white"
                            >
                                Close
                            </button>

                        </div>
                    )}
                    
                </div>

            </div>

        </div>
    );
}