import {
  Heart,
  MapPin,
  Clock,
  Star,
} from "lucide-react";

// const IMAGE_URL = "https://turf-backend-mtku.onrender.com/uploads/turfs/";
const IMAGE_URL = "http://192.168.1.17:4500/uploads/turfs/";

export default function TurfCard({ turf }) {
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
          src={`${IMAGE_URL}${turf.cover_image}`}
          alt={turf.turf_name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />

        {/* Heart */}

        <button
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
        </button>

        {/* Sport */}

        

      </div>

      {/* Body */}

      <div className="space-y-3 p-4">

        <h3 className="line-clamp-2 text-lg font-bold text-slate-900">
          {turf.turf_name}
        </h3>

        <div className="flex items-center gap-2 text-sm text-slate-500">

          <MapPin
            size={16}
            className="text-emerald-500 shrink-0"
          />

          <span className="truncate">
            {turf.location}
          </span>

        </div>

        <div className="flex items-center justify-between">

  {/* Stars + Rating */}
  <div className="flex items-center">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={15}
        fill="#facc15"
        stroke="#facc15"
      />
    ))}

    <span className="ml-2 text-sm font-medium text-slate-500">
      4.6
    </span>
  </div>

  {/* Sport Type */}
  <span className="rounded-full px-3 py-1 text-xs font-semibold text-black">
    {turf.sport_type}
  </span>

</div>

        <div className="flex items-center justify-between border-t border-slate-100 pt-3">

          <div className="flex items-center gap-1 text-xs text-slate-500">

            <Clock
              size={15}
              className="text-emerald-500"
            />

            <span>
              {turf.opening_time.slice(0, 5)} - {turf.closing_time.slice(0, 5)}
            </span>

          </div>

          <button
            className="
              rounded-full
              bg-slate-900
              px-4
              py-2
              text-xs
              font-semibold
              text-white
              transition
              hover:bg-emerald-500
            "
          >
            Check Slot →
          </button>

        </div>

      </div>

    </div>
  );
}