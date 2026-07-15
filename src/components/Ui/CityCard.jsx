import { MapPin } from "lucide-react";

export default function CityCard({
  city,
  image,
  turfs,
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl">

      <img
        src={image}
        alt={city}
        className="h-72 w-full object-cover transition duration-500 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

      <div className="absolute bottom-6 left-6">

        <div className="flex items-center gap-2 text-white">

          <MapPin size={18} />

          <h3 className="text-2xl font-bold">
            {city}
          </h3>

        </div>

        <p className="mt-2 text-slate-200">
          {turfs} Turfs Available
        </p>

      </div>

    </div>
  );
}