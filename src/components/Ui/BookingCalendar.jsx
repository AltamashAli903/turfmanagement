import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";

export default function BookingCalendar({
    selectedDate,
    setSelectedDate,
    setSelectedSlot,
    fetchAvailableSlots,
}) {

    const handleSelect = (date) => {

        if (!date) return;

        setSelectedDate(date);

        setSelectedSlot(null);

        fetchAvailableSlots(format(date, "yyyy-MM-dd"));
    };

    return (
        <div className="rounded-3xl border border-emerald-100 bg-linear-to-b from-emerald-50 via-white to-white shadow-xl p-3">

            <div className="">

                <DayPicker
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleSelect}
                    disabled={{ before: new Date() }}
                    showOutsideDays
                    fixedWeeks
                    className="w-full h-[55vh] pl-3"
                    classNames={{
                        root: "w-full",

                        month: "w-full",

                        month_caption:
                            "flex items-center justify-center relative mb-3",

                        caption_label:
                            "text-2xl font-bold text-emerald-600 mt-0.5",

                        nav: "absolute inset-x-0 flex justify-between z-50",

                        button_previous:
                            "h-10 w-10 rounded-full hover:bg-emerald-50 flex items-center justify-center transition",

                        button_next:
                            "h-10 w-10 rounded-full hover:bg-emerald-50 flex items-center justify-center transition",

                        weekdays:
                            "grid grid-cols-7 mb-2",

                        weekday:
                            "text-center text-sm font-semibold text-black",

                        weeks:
                            "space-y-2",

                        week:
                            "grid grid-cols-7",

                        day:
                            "h-7 w-11 flex items-center justify-center rounded-xl text-[15px] transition-all",

                        day_button:
                            "w-11 h-8 rounded-xl hover:bg-emerald-50 text-black hover:text-emerald-600",

                        selected:
                            "border border-emerald-500 bg-emerald-50 rounded-xl text-emerald-70",

                        today:
                            "",

                        outside:
                            "text-slate-300",

                        disabled:
                            "text-slate-300 opacity-40",
                    }}
                    components={{
                        Chevron: ({ orientation, ...props }) =>
                            orientation === "left" ? (
                                <ChevronLeft {...props} size={20} />
                            ) : (
                                <ChevronRight {...props} size={20} />
                            ),
                    }}
                />

            </div>

        </div>
    );
}