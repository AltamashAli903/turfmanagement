import { useEffect, useState } from "react";
import API from "../../api/axios";
import { X, Trash2, CalendarDays } from "lucide-react";
import Toast from "../Ui/Toast";
import CustomizedAlert from "../Ui/CustomizedAlert";
export default function HolidayModal({
    open,
    setOpen,
    turf,
    onSuccess,
}) {
    const owner = JSON.parse(localStorage.getItem("owner"));
    const [selectedMonth, setSelectedMonth] = useState(
        new Date().getMonth() + 1
    );
    const [alert, setAlert] = useState({
        open: false,
        type: "delete",
        title: "",
        message: "",
        onConfirm: null,
    });
    const [toast, setToast] = useState(null);
    const weekDays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    const [holidays, setHolidays] = useState([]);

    const [form, setForm] = useState({
        type: "HOLIDAY",
        holiday_date: "",
        weekly_off_day: "",
        description: "",
    });

    useEffect(() => {
        if (open && turf) {
            loadHoliday();
        }
    }, [open, turf]);



    const loadHoliday = async () => {
        try {
            const payload = {
                turf_id: turf.id,
                month: selectedMonth,
                year: new Date().getFullYear(),
            };

            const res = await API.post("/holiday/list", payload);

            setHolidays(res.data.data || []);

        } catch (err) {

            setToast({
                message:
                    err.response?.data?.message ||
                    "Failed to load holidays",
                type: "error",
            });

        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const res = await API.post("/holiday/create", {
                turf_id: turf.id,
                type: form.type,
                holiday_date:
                    form.type === "WEEKLY_OFF"
                        ? null
                        : form.holiday_date,
                weekly_off_day:
                    form.type === "WEEKLY_OFF"
                        ? form.weekly_off_day
                        : null,
                description: form.description,
                updated_by: owner.id,
            });


            setToast({
                message:
                    res.data.message ||
                    "Holiday added successfully",
                type: "success",
            });


            setForm({
                type: "HOLIDAY",
                holiday_date: "",
                weekly_off_day: "",
                description: "",
            });


            loadHoliday();

            if (onSuccess) onSuccess();


        } catch (err) {

            setToast({
                message:
                    err.response?.data?.message ||
                    "Failed to add holiday",
                type: "error",
            });

        }
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

        if (index === elements.length - 1) {
            e.target.form.requestSubmit();
            return;
        }

        elements[index + 1].focus();
    };

    const deleteHoliday = (id) => {
        setAlert({
            open: true,
            type: "delete",
            title: "Delete Holiday?",
            message: "This action cannot be undone.",
            onConfirm: async () => {
                try {
                    const res = await API.put("/holiday/delete", {
                        id,
                    });

                    setToast({
                        message:
                            res.data.message ||
                            "Holiday deleted successfully",
                        type: "success",
                    });

                    loadHoliday();

                    if (onSuccess) onSuccess();
                } catch (err) {
                    setToast({
                        message:
                            err.response?.data?.message ||
                            "Failed to delete holiday",
                        type: "error",
                    });
                }

                setAlert((prev) => ({
                    ...prev,
                    open: false,
                }));
            },
        });
    };

    const isFormValid =
        form.type === "WEEKLY_OFF"
            ? form.weekly_off_day !== ""
            : form.holiday_date !== "";

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="w-[760px] rounded-2xl bg-white shadow-2xl">

                {/* Header */}

                <div className="flex items-center justify-between border-b p-4">

                    <div className="flex items-center gap-2">

                        <h2 className="text-2xl font-bold">
                            Manage Holidays
                        </h2>



                    </div>

                    <div className="flex items-center gap-3">


                        <select
                            value={selectedMonth}
                            onChange={(e) => {
                                setSelectedMonth(Number(e.target.value));
                                loadHoliday();
                            }}
                            className="rounded-lg border border-slate-300 bg-white px-2 py-2 text-sm focus:border-emerald-600 focus:outline-none"
                        >
                            <option value={1}>January</option>
                            <option value={2}>February</option>
                            <option value={3}>March</option>
                            <option value={4}>April</option>
                            <option value={5}>May</option>
                            <option value={6}>June</option>
                            <option value={7}>July</option>
                            <option value={8}>August</option>
                            <option value={9}>September</option>
                            <option value={10}>October</option>
                            <option value={11}>November</option>
                            <option value={12}>December</option>
                        </select>
                        <button
                            onClick={() => setOpen(false)}
                            className="rounded-lg p-2 transition hover:bg-slate-100"
                        >
                            <X size={20} />
                        </button>
                    </div>

                </div>

                <div className="p-3 space-y-3">

                    {/* FORM */}

                    <form
                        onSubmit={handleSubmit}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">

                            {/* Type */}

                            <div className="md:col-span-3">


                                <select
                                    value={form.type}
                                    onKeyDown={handleEnter}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            type: e.target.value,
                                            weekly_off_day: "",
                                            holiday_date: "",
                                        })
                                    }
                                    className="w-full rounded-lg border p-2 text-sm"
                                >
                                    <option value="HOLIDAY">Holiday</option>
                                    <option value="TEMPORARY_CLOSE">Temporary Close</option>
                                    <option value="WEEKLY_OFF">Weekly Off</option>
                                </select>

                            </div>

                            {/* Date / Day */}

                            <div className="md:col-span-3">



                                {form.type === "WEEKLY_OFF" ? (
                                    <select
                                        className="w-full rounded-lg border p-2 text-sm"
                                        value={form.weekly_off_day}
                                        onKeyDown={handleEnter}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                weekly_off_day: Number(e.target.value),
                                            })
                                        }
                                    >
                                        <option value="">Select Day</option>

                                        {weekDays.map((day, index) => (
                                            <option key={index} value={index}>
                                                {day}
                                            </option>
                                        ))}

                                    </select>
                                ) : (
                                    <input
                                        type="date"
                                        className="w-full rounded-lg border p-2 text-sm"
                                        onKeyDown={handleEnter}
                                        value={form.holiday_date}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                holiday_date: e.target.value,
                                            })
                                        }
                                    />
                                )}

                            </div>

                            {/* Description */}

                            <div className="md:col-span-4">

                                <input
                                    type="text"
                                    placeholder="Optional"
                                    value={form.description}
                                    onKeyDown={handleEnter}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            description: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-lg border p-2 text-sm"
                                />

                            </div>

                            {/* Save */}

                            <div className="md:col-span-2">

                                <button
                                    type="submit"
                                    disabled={!isFormValid}
                                    className={`w-full rounded-lg py-2 font-semibold text-white transition
        ${isFormValid
                                            ? "bg-emerald-700 hover:bg-emerald-800"
                                            : "cursor-not-allowed bg-emerald-700 hover:bg-emerald-800"
                                        }`}
                                >
                                    Save
                                </button>

                            </div>

                        </div>

                    </form>

                    {/* LIST */}

                    <div className="h-[320px] overflow-y-auto rounded-xl border border-slate-200 p-3">

                        <div
                            className="grid gap-3"
                            style={{
                                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                            }}
                        >
                            {[
                                ...holidays.filter(item => item.type === "WEEKLY_OFF"),
                                ...holidays.filter(item => item.type !== "WEEKLY_OFF")
                            ].map((item) => (

                                <div
                                    key={item.id}
                                    className="rounded-xl border border-slate-200 bg-slate-50 p-2 hover:bg-slate-100"
                                >

                                    <div className="flex items-start justify-between">

                                        <span
                                            className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase
                        ${item.type === "WEEKLY_OFF"
                                                    ? "bg-amber-100 text-amber-700"
                                                    : item.type === "TEMPORARY_CLOSE"
                                                        ? "bg-red-100 text-red-700"
                                                        : "bg-emerald-100 text-emerald-700"
                                                }`}
                                        >
                                            {item.type.replaceAll("_", " ")}
                                        </span>

                                        <button
                                            onClick={() => deleteHoliday(item.id)}
                                            className="rounded p-1 text-red-500 hover:bg-red-100"
                                        >
                                            <Trash2 size={16} />
                                        </button>

                                    </div>


                                    <div className="mt-3 text-sm">

                                        <p className="font-semibold">
                                            {item.type === "WEEKLY_OFF"
                                                ? weekDays[item.weekly_off_day]
                                                : item.holiday_date}
                                        </p>

                                        <p className="mt-2 text-slate-600 line-clamp-2">
                                            {item.description || "-"}
                                        </p>

                                    </div>

                                </div>

                            ))}
                        </div>

                    </div>

                </div>

            </div>
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
            <CustomizedAlert
                open={alert.open}
                type={alert.type}
                title={alert.title}
                message={alert.message}
                showCancel
                confirmText="Delete"
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





