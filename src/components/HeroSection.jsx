import SearchBar from "./Ui/SearchBar";
import heroBg from "../assets/Bg- Turf.png";

export default function HeroSection() {
  return (
    <section
      className="relative flex min-h-screen items-center overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `url(${heroBg})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/55 to-black/70" />

      {/* Hero Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-24 pb-16 lg:px-8">

        <div className="mx-auto max-w-5xl text-center">

          {/* <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm text-white backdrop-blur-md">
            ⚽ India's Smartest Turf Booking Platform
          </span> */}

          <h1 className="mt-8 text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Play Anytime.
            <br />
            Book The Best Turf
            <br />
            <span className="text-emerald-500">
              Near You.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg lg:text-xl">
            Discover Football, Cricket, Badminton, Tennis and many more sports
            venues with instant online booking and real-time slot availability.
          </p>

          <div className="mx-auto mt-12 max-w-3xl">
            <SearchBar />
          </div>

          {/* Stats */}

          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-3">

            <StatCard
              value="500+"
              title="Premium Turfs"
            />

            <StatCard
              value="25+"
              title="Cities"
            />

            <StatCard
              value="50K+"
              title="Bookings"
            />

          </div>

        </div>

      </div>

      {/* Scroll Down Indicator */}
{/* 
      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 animate-bounce md:block">

        <div className="flex h-12 w-7 justify-center rounded-full border border-white/40">

          <div className="mt-2 h-3 w-1 rounded-full bg-white"></div>

        </div>

      </div> */}

    </section>
  );
}

function StatCard({ value, title }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white/15">

      <h3 className="text-3xl font-bold text-emerald-400">
        {value}
      </h3>

      <p className="mt-2 text-sm text-slate-300">
        {title}
      </p>

    </div>
  );
}