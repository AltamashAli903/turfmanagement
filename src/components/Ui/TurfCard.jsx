import {
  Heart,
  MapPin,
  Clock,
  Star,
} from "lucide-react";
import { IMAGE_URL } from "../../api/axios";
import { formatTo12Hour } from "../../utils/TimeFormat"

export default function TurfCard({ turf,
  onViewDetails,
  onCheckSlot }) {
  return (
    <div
      className="
  w-[90%]
  max-w-[320px]
  sm:w-full
  group
  overflow-hidden
  rounded-3xl
  bg-white
  border
  border-slate-200
  shadow-md
  transition-all
  duration-300
  hover:-translate-y-2
  hover:shadow-2xl
"
    >
      {/* Image */}
      <div className="relative h-44 sm:h-48 lg:h-48 overflow-hidden">

        <img
          src={`${IMAGE_URL}/uploads/turfs/${turf.cover_image}`}
          alt={turf.turf_name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />

        {/* Heart */}

        {/* <button
          className="
            absolute
            right-3
            top-3
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            bg-white
            shadow-lg
            transition
            hover:bg-red-500
            hover:text-white
          "
        >
          <Heart size={18} />
        </button> */}

        {/* Sport */}



      </div>

      {/* Body */}

      <div className="space-y-3 p-4">

        <h3 className="line-clamp-2 text-lg font-bold text-slate-900">
          {turf.turf_name}
        </h3>
          

        <div className="flex items-center gap-2 text-sm text-slate-500">

          <MapPin
            size={18}
            className="text-emerald-500 shrink-0"
          />

          <span className="truncate">
            {turf.location}
          </span>

        </div>

        <div className="flex items-center justify-between gap-2">

          

          {/* Sport Type */}
          <div className="mb-1 mt-1 flex items-center gap-2 text-sm text-slate-500">

            <Clock
              size={16}
              className="text-emerald-500"
            />

            <span>
              {formatTo12Hour(turf.opening_time)} - {formatTo12Hour(turf.closing_time)}
            </span>

          </div>

        </div>

        <div className="border-t border-slate-100 pt-4">



         <div>

<button
   onClick={() => onCheckSlot(turf)}
   className="
      w-full
      rounded-xl
      bg-emerald-600
      py-3
      text-white
      font-semibold
      hover:bg-emerald-700
   "
>
   Book Now →
</button>

</div>

        </div>

      </div>

    </div>
  );
}