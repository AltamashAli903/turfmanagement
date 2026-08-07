import { useEffect, useState } from "react";
import CustomizedAlert from "../Ui/CustomizedAlert";
import Calendar from "react-calendar";
import { formatDateForApi } from "../../utils/DateFormat";
import "react-calendar/dist/Calendar.css";
import {
    X, ChevronLeft, ChevronRight, User, Phone, MapPin, Clock, CheckCircle2, Clock3, BadgeIndianRupee,
    Contact, CalendarDays, Wallet, ShieldCheck, CarFront, Toilet, GlassWater, Coffee, LockKeyhole,
} from "lucide-react";

import { formatTo12Hour } from "../../utils/TimeFormat";
import BookingCalendar from "../Ui/BookingCalendar";
import API, { IMAGE_URL } from "../../api/axios";
import ContactImage from "../../assets/turf.png";
import Logo from "../../assets/turf.png";
import { useRef } from "react";
import { FaGoogle, FaFacebookF, FaTwitter, FaEye, FaEyeSlash, } from "react-icons/fa";
export default function SlotAvailabilityModal({
    turf,
    onClose,
}) {
    /* ==========================================================
        STATES
    ========================================================== */
    const [galleryPage, setGalleryPage] = useState(0);
    const [step, setStep] = useState("details");
    const [slots, setSlots] = useState([]);
    const [slotLoading, setSlotLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [customer, setCustomer] = useState({ name: "", phone: "", });
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [gallery, setGallery] = useState([]);
    const nameRef = useRef(null);
    const phoneRef = useRef(null);

    const [alert, setAlert] = useState({
        open: false,
        type: "confirm",
        title: "",
        message: "",
        onConfirm: null,
    });
    const confirmBooking = () => {
        setAlert({
            open: true,
            type: "confirm",
            title: "Confirm Booking?",
            message:
                "Please verify all booking details before submitting. Once submitted, your booking request will be sent to the turf owner.",
            onConfirm: () => {
                setAlert((prev) => ({ ...prev, open: false }));
                createBooking();
            },
        });
    };

    const IMAGES_PER_PAGE = 4;
    const totalPages = Math.ceil(gallery.length / IMAGES_PER_PAGE);
    const visibleImages = gallery.slice(
        galleryPage * IMAGES_PER_PAGE,
        galleryPage * IMAGES_PER_PAGE + IMAGES_PER_PAGE
    );

    const [showAllSlots, setShowAllSlots] = useState(false);
    const visibleSlots =
        slots.length > 8
            ? showAllSlots
                ? slots.slice(8)
                : slots.slice(0, 8)
            : slots;

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
                booking_date: formatDateForApi(selectedDate),
                customer_name: customer.name,
                customer_phone: customer.phone,
                payment_status: "pending",
            });

            if (res.data.success) {
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

    const facilityIcons = {
        Parking: CarFront,
        Washroom: Toilet,
        "Drinking Water": GlassWater,
        Cafeteria: Coffee,
        Locker: LockKeyhole,
    };

    /* ==========================================================
        GALLERY
    ========================================================== */

    const loadGallery = async () => {
        try {
            const res = await API.post("/gallery/list", {
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
        if (step === "details") {
            setStep("date");
        } else if (step === "date") {
            setStep("customer");
        } else if (step === "customer") {
            setStep("summary");
        } else if (step === "summary") {
            createBooking();
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
                                    className="w-full h-[250px] rounded-2xl object-cover border-black border-2"
                                    alt=""
                                />

                                <div className="grid grid-cols-6 gap-3 mt-6">
                                    <button
                                        disabled={galleryPage === 0}
                                        onClick={() => setGalleryPage((p) => p - 1)}
                                        className={`h-10 w-10 mt-5  rounded-full border flex items-center justify-center
                                                ${galleryPage === 0
                                                ? "opacity-40 cursor-not-allowed"
                                                : "hover:bg-emerald-50"
                                            }`}
                                    >
                                        <ChevronLeft size={15} />
                                    </button>

                                    {visibleImages.map((img, index) => {

                                        const actualIndex =
                                            galleryPage * IMAGES_PER_PAGE + index;

                                        return (

                                            <img
                                                key={img.id}
                                                src={`${IMAGE_URL}${img.image_path}`}
                                                onClick={() => setSelectedImage(actualIndex)}
                                                className={`h-20 w-full rounded-xl object-cover cursor-pointer border-1 transition

                                                        ${selectedImage === actualIndex
                                                        ? "border-emerald-500"
                                                        : "border-slate-900"
                                                    }`}
                                            />

                                        );

                                    })}
                                    <button
                                        disabled={galleryPage === totalPages - 1}
                                        onClick={() => setGalleryPage((p) => p + 1)}
                                        className={`h-10 w-10 rounded-full border flex items-center justify-center mt-5 ml-6
                                                ${galleryPage === totalPages - 1
                                                ? "opacity-40 cursor-not-allowed"
                                                : "hover:bg-emerald-50"
                                            }`}
                                    >
                                        <ChevronRight size={15} />
                                    </button>

                                </div>

                            </div>

                            {/* Details */}

                            <div className="flex flex-col gap-3">

                                <h2 className="text-3xl font-bold">

                                    {turf.turf_name}

                                </h2>

                                <div className="flex items-center gap-2 mt-2 text-slate-600">

                                    <MapPin
                                        size={20}
                                        className="text-black"
                                    />

                                    {turf.location}

                                    <Clock
                                        size={20}
                                        className="text-black ml-6"
                                    />

                                    {formatTo12Hour(
                                        turf.opening_time
                                    )}{" "}
                                    -

                                    {formatTo12Hour(
                                        turf.closing_time
                                    )}

                                </div>

                                <div className="">
                                    <h3 className="font-semibold text-lg mb-1">
                                        Facilities
                                    </h3>

                                    {(() => {
                                        const facilities = Array.isArray(turf.facilities)
                                            ? turf.facilities
                                            : typeof turf.facilities === "string"
                                                ? JSON.parse(turf.facilities)
                                                : [];

                                        if (!facilities.length) {
                                            return (
                                                <p className="text-slate-400">
                                                    No facilities available
                                                </p>
                                            );
                                        }

                                        return (
                                            <div className="grid grid-cols-3 gap-y-2 gap-x-2">
                                                {facilities.map((facility, index) => {
                                                    const Icon = facilityIcons[facility];

                                                    return (
                                                        <div
                                                            key={index}
                                                            className="flex items-center gap-1"
                                                        >
                                                            {Icon && (
                                                                <div className="flex h-6 w-6 items-center justify-center">
                                                                    <Icon
                                                                        size={18}
                                                                        className=""
                                                                    />
                                                                </div>
                                                            )}

                                                            <span className="text-slate-700 text-xs font-medium">
                                                                {facility}
                                                            </span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        );
                                    })()}
                                </div>

                                <div className="mt-2">

                                    <h3 className="font-semibold text-lg">
                                        About Turf
                                    </h3>

                                    <p className="text-slate-600 leading-7">
                                        {turf.description ||
                                            "Premium sports turf with high-quality playing surface, flood lights, parking, washrooms and refreshment facilities."}
                                    </p>

                                </div>


                                <div className="mt-4 flex justify-end pt-2">

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
                        <div className="grid lg:grid-cols-[360px_1fr] gap-4 items-start">

                            {/* LEFT SIDE */}

                            <div className="max-w-90">

                                <div className="rounded-[30px] overflow-hidden bg-linear-to-b from-emerald-50 via-white to-white border border-emerald-100 shadow-xl">
                                    {/* Calendar */}

                                    <div className="">

                                        <BookingCalendar
                                            selectedDate={selectedDate}
                                            setSelectedDate={setSelectedDate}
                                            setSelectedSlot={setSelectedSlot}
                                            fetchAvailableSlots={fetchAvailableSlots}
                                        />

                                    </div>

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

                                            <div className="flex items-center justify-between mb-6">

                                                <h2 className="text-2xl font-bold">
                                                    Available Slots
                                                </h2>

                                                {slots.length > 8 && (
                                                    <button
                                                        onClick={() => setShowAllSlots(!showAllSlots)}
                                                        className="rounded-full px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:scale-105 hover:text-emerald-800"
                                                    >
                                                        {showAllSlots ? "Show Less...." : "Show More...."}
                                                    </button>
                                                )}

                                            </div>

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

                                                <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-3 mt-0">
                                                    {visibleSlots.map((slot) => {
                                                        const selected = selectedSlot?.id === slot.id;
                                                        console.log("selectedSlot:", selectedSlot);
                                                        return (
                                                            <button
                                                                key={slot.id}
                                                                onClick={() => setSelectedSlot(slot)}
                                                                className={`
                                                                        group
                                                                        w-full
                                                                        h-13
                                                                        rounded-full
                                                                        border
                                                                        px-2
                                                                        flex
                                                                        items-center
                                                                        justify-between
                                                                        transition-all
                                                                        duration-300
                                                                        ${selected
                                                                        ? "bg-emerald-50 text-black border-emerald-600 shadow-lg shadow-emerald-200"
                                                                        : "bg-white border-slate-200 hover:border-emerald-500 hover:shadow-md"
                                                                    }
    `}
                                                            >
                                                                {/* Left */}
                                                                <div className="flex items-center gap-1">

                                                                    <div
                                                                        className={`
                                                                                    h-6
                                                                                    w-6
                                                                                    rounded-full
                                                                                    flex
                                                                                    items-center
                                                                                    justify-center
                                                                                    ${selected
                                                                                ? "bg-white/20"
                                                                                : "bg-emerald-50"
                                                                            }
            `}
                                                                    >
                                                                        {selected ? (
                                                                            <CheckCircle2
                                                                                size={16}
                                                                                className="text-emerald-800"
                                                                            />
                                                                        ) : (
                                                                            <Clock3
                                                                                size={14}
                                                                                className="text-emerald-600"
                                                                            />
                                                                        )}
                                                                    </div>

                                                                    <span
                                                                        className={`
                                                                                text-xs
                                                                                font-semibold
                                                                                whitespace-nowrap
                                                                                ${selected
                                                                                ? "text-black"
                                                                                : "text-slate-800"
                                                                            }
            `}
                                                                    >
                                                                        {formatTo12Hour(slot.slot_start)} - {formatTo12Hour(slot.slot_end)}
                                                                    </span>

                                                                </div>

                                                                {/* Right */}
                                                                <div className="flex items-center ">

                                                                    <span
                                                                        className={`
                                                                                pl-2
                                                                                rounded-full
                                                                                text-xs
                                                                                font-bold
                                                                                ${selected
                                                                                ? " text-emerald-600"
                                                                                : " text-black"
                                                                            }
                                                                       `}
                                                                    >
                                                                        ₹{slot.price}
                                                                    </span>

                                                                    {selected ? (
                                                                        <CheckCircle2
                                                                            size={1}
                                                                            className="text-emerald-800"
                                                                        />
                                                                    ) : (
                                                                        <ChevronRight
                                                                            size={16}
                                                                            className="text-slate-400 group-hover:text-emerald-600 transition"
                                                                        />
                                                                    )}

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
                                    className="px-6 py-1 rounded-2xl border hover:bg-slate-100 transition"
                                >
                                    Back
                                </button>

                                <button
                                    disabled={!selectedSlot}
                                    onClick={nextStep}
                                    className={`px-10 py-1 rounded-2xl font-semibold transition-all
                                            ${selectedSlot
                                            ? "bg-gradient-to-r from-emerald-600 to-emerald-400 hover:shadow-xl hover:scale-105"
                                            : "bg-slate-300 cursor-not-allowed"
                                        } text-white`}
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
                        <div className="h-[68vh] rounded-[30px] overflow-hidden shadow-2xl bg-white relative grid lg:grid-cols-[55%_45%]">
                            {/* ================= LEFT PANEL ================= */}

                            <div className="relative overflow-hidden z-20">

                                <img
                                    src={ContactImage}
                                    className="absolute inset-0 w-full h-full object-cover"
                                    alt=""
                                />

                                <div className="absolute inset-0" />

                            </div>

                            {/* ================= RIGHT PANEL ================= */}

                            <div className="bg-white flex flex-col justify-center pr-14 py-0 relative z-10">

                                <h2 className="text-2xl text-center font-bold mb-2 ">
                                    Customer Details
                                </h2>

                                <p className="text-slate-500 text-center mb-4">
                                    Please enter your contact details
                                </p>

                                <div className="space-y-3">

                                    <div>
                                        <label className="block text-xs font-semibold mb-2">
                                            Full Name
                                        </label>

                                        <input
                                            ref={nameRef}
                                            type="text"
                                            value={customer.name}
                                            onChange={(e) =>
                                                setCustomer({
                                                    ...customer,
                                                    name: e.target.value,
                                                })
                                            }
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    e.preventDefault();
                                                    phoneRef.current?.focus();
                                                }
                                            }}
                                            placeholder="Enter your name"
                                            className="w-full rounded-xl border border-slate-300 px-2 py-2 outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold mb-2">
                                            Phone Number
                                        </label>

                                        <input
                                            ref={phoneRef}
                                            type="tel"
                                            maxLength={10}
                                            value={customer.phone}
                                            onChange={(e) =>
                                                setCustomer({
                                                    ...customer,
                                                    phone: e.target.value.replace(/\D/g, ""),
                                                })
                                            }
                                            onKeyDown={(e) => {
                                                if (
                                                    e.key === "Enter" &&
                                                    customer.name.trim() !== "" &&
                                                    customer.phone.length === 10
                                                ) {
                                                    e.preventDefault();
                                                    nextStep();
                                                }
                                            }}
                                            placeholder="Enter phone number"
                                            className="w-full rounded-xl border border-slate-300 px-2 py-2 outline-none"
                                        />
                                    </div>
                                    <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-2 py-1">
                                        <p className="text-xs text-amber-800">
                                            📌 Note : Please verify your name and number carefully  your booking will be confirmed using these details
                                        </p>
                                    </div>

                                </div>

                                <div className="mt-5 flex justify-between">

                                    <button
                                        onClick={prevStep}
                                        className="px-1 pr-4 py-1 mb-3 rounded-xl border hover:bg-slate-100 flex items-center gap-2"
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
                                        className={`px-1 pl-3 py-1.5 rounded-xl flex items-center gap-2 text-white mb-3 ${customer.name.trim() !== "" &&
                                            customer.phone.length === 10
                                            ? "bg-gradient-to-r from-emerald-600 to-emerald-400"
                                            : "bg-slate-300 cursor-not-allowed"
                                            }`}
                                    >
                                        Continue
                                        <ChevronRight size={18} />
                                    </button>

                                </div>
                            </div>
                        </div>
                    )}

                    {/* ==========================================================
                        STEP 4 - BOOKING SUMMARY
                        ========================================================== */}

                    {step === "summary" && (
                        <div className="max-w-4xl ">

                            <div className="overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-xl">

                                <div className="h-1.5 bg-gradient-to-r from-emerald-500 to-green-500"></div>

                                <div className="p-3">

                                    {/* HEADER */}

                                    <div className="flex items-center justify-between">

                                        <div className="flex items-center gap-4">

                                            <div className="h-16 w-16 rounded-2xl bg-emerald-50 flex items-center justify-center border border-emerald-100">

                                                <img
                                                    src={turf.logo || Logo}
                                                    alt=""
                                                    className="h-10 w-10 object-contain"
                                                />

                                            </div>

                                            <div>

                                                <h3 className="text-2xl font-bold text-slate-900">
                                                    {turf.turf_name}
                                                </h3>

                                                <div className="flex items-center gap-2 mt-1 text-slate-500">

                                                    <MapPin size={15} className="text-emerald-600" />

                                                    <span className="text-sm">
                                                        {turf.location}
                                                    </span>

                                                </div>

                                            </div>



                                        </div>

                                    </div>

                                    <div className="my-4 border-t border-dashed"></div>

                                    {/* INFO */}

                                    <div className="grid grid-cols-4 gap-3">

                                        <div className="rounded-2xl border border-slate-200 p-4 flex items-center gap-3">

                                            <div className="h-11 w-11 rounded-xl bg-emerald-50 flex items-center justify-center">
                                                <CalendarDays size={18} className="text-emerald-600" />
                                            </div>

                                            <div>

                                                <p className="text-[11px] uppercase text-slate-400">
                                                    Date
                                                </p>

                                                <h4 className="font-semibold text-xs">
                                                    {selectedDate.toDateString()}
                                                </h4>

                                            </div>

                                        </div>

                                        <div className="rounded-2xl border border-slate-200 p-4 flex items-center gap-3">

                                            <div className="h-11 w-11 rounded-xl bg-emerald-50 flex items-center justify-center">
                                                <Clock3 size={18} className="text-emerald-600" />
                                            </div>

                                            <div>

                                                <p className="text-[11px] uppercase text-slate-400">
                                                    Slot
                                                </p>

                                                <h4 className="font-semibold text-xs">
                                                    {formatTo12Hour(selectedSlot.slot_start)} - {formatTo12Hour(selectedSlot.slot_end)}
                                                </h4>

                                            </div>

                                        </div>

                                        <div className="rounded-2xl border border-slate-200 p-4 flex items-center gap-3">

                                            <div className="h-11 w-11 rounded-xl bg-emerald-50 flex items-center justify-center">
                                                <User size={18} className="text-emerald-600" />
                                            </div>

                                            <div>

                                                <p className="text-[11px] uppercase text-slate-400">
                                                    Customer
                                                </p>

                                                <h4 className="font-semibold text-sm">
                                                    {customer.name}
                                                </h4>

                                            </div>

                                        </div>

                                        <div className="rounded-2xl border border-slate-200 p-4 flex items-center gap-3">

                                            <div className="h-11 w-11 rounded-xl bg-emerald-50 flex items-center justify-center">
                                                <Phone size={18} className="text-emerald-600" />
                                            </div>

                                            <div>

                                                <p className="text-[11px] uppercase text-slate-400">
                                                    Mobile
                                                </p>

                                                <h4 className="font-semibold text-sm">
                                                    {customer.phone}
                                                </h4>

                                            </div>

                                        </div>

                                    </div>

                                    <div className="mt-8 flex items-center justify-between border-t border-dashed border-slate-300 pt-6">

                                        {/* Left */}

                                        <div>

                                            <p className="text-xs uppercase tracking-widest text-slate-400">
                                                Amount Payable
                                            </p>

                                            <h2 className="mt-1 text-3xl font-black text-emerald-600">
                                                ₹{selectedSlot.price}
                                            </h2>

                                            <p className="mt-1 text-xs text-slate-500">
                                                Secure booking • No hidden charges
                                            </p>

                                        </div>

                                        {/* Buttons */}

                                        <div className="flex items-center gap-4">

                                            <button
                                                onClick={prevStep}
                                                className="group flex h-12 items-center gap-2 rounded-xl border border-slate-300 bg-white px-2 pr-4 font-semibold text-slate-700 transition-all duration-300 hover:-translate-y-1 hover:border-slate-400 hover:bg-slate-50 hover:shadow-lg"
                                            >
                                                <ChevronLeft
                                                    size={18}
                                                    className="transition-transform group-hover:-translate-x-1"
                                                />

                                                Back

                                            </button>

                                            <button
                                                onClick={confirmBooking}
                                                className="group flex h-12 items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-500 px-2 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl"
                                            >

                                                <ShieldCheck
                                                    size={18}
                                                    className="transition-transform duration-300 group-hover:rotate-12"
                                                />

                                                Confirm Booking

                                            </button>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>
                    )}

                    {/* ==========================================================
                        STEP 5 - SUCCESS
                        ========================================================== */}

                    {step === "success" && (
                        <div className="flex justify-center ">

                            <div className="">

                                {/* Top Accent */}
                                <div className="" />

                                <div className="px-10 py-1">

                                    {/* Success Icon */}
                                    <div className="flex justify-center">

                                        <div className="relative">

                                            <div className="absolute inset-0 animate-ping rounded-full bg-emerald-300 opacity-20"></div>

                                            <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100">

                                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-green-500 shadow-xl">

                                                    <CheckCircle2
                                                        size={40}
                                                        className="text-white"
                                                    />

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                    {/* Heading */}

                                    <div className="mt-6 text-center">
                                        <h2 className="text-3xl font-extrabold text-slate-900">
                                            Booking Submitted!
                                        </h2>

                                        <p className="mx-auto mt-4 max-w-lg text-lg leading-7 text-slate-500">
                                            Thank you for choosing us your booking request has been received successfully.
                                            Owner Will Contact You For Confirmation.
                                            You can complete the payment online or directly at the venue. <br />
                                        </p>
                                    </div>

                                    {/* Button */}

                                    <div className="mt-6 flex justify-center">

                                        <button
                                            onClick={onClose}
                                            className="rounded-xl bg-gradient-to-r from-emerald-600 to-green-500 px-10 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                                        >
                                            Done
                                        </button>

                                    </div>

                                </div>

                            </div>

                        </div>
                    )}

                </div>

            </div>
            <CustomizedAlert
                open={alert.open}
                type={alert.type}
                title={alert.title}
                message={alert.message}
                showCancel
                confirmText="Confirm"
                cancelText="Cancel"
                onConfirm={alert.onConfirm}
                onCancel={() =>
                    setAlert((prev) => ({
                        ...prev,
                        open: false,
                    }))
                }
            />

        </div>
    );
}