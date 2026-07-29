import {
  Building2,
  CalendarDays,
  Clock3,
  MapPin,
  ShieldCheck,
  Trophy,
  ArrowRight,
} from "lucide-react";
import SectionTitle from "../components/Ui/SectionTitle";
const features = [
  {
    icon: <MapPin size={24} />,
    title: "Find Nearby Turfs",
    description:
      "Discover football, cricket, badminton and more from multiple owners.",
  },
  {
    icon: <CalendarDays size={24} />,
    title: "Instant Booking",
    description:
      "Book available slots in seconds with live availability.",
  },
  {
    icon: <Building2 size={24} />,
    title: "Multiple Owners",
    description:
      "Compare facilities from different turf owners on one platform.",
  },
  {
    icon: <Clock3 size={24} />,
    title: "Real-Time Slots",
    description:
      "Always see the latest slot availability before booking.",
  },
  {
    icon: <ShieldCheck size={24} />,
    title: "Reliable Platform",
    description:
      "Fast, secure and easy booking experience for everyone.",
  },
  {
    icon: <Trophy size={24} />,
    title: "Sports Community",
    description:
      "Helping players discover great venues and play more often.",
  },
];

const About = () => {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
         <SectionTitle
            badge="about"
            title="About Us"
            subtitle="Find Multiple Turfs Options Under A Single Platform"
          />
        {/* Hero */}
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-600">
              About Our Platform
            </span>

            <h2 className="mt-5 text-4xl font-bold tracking-tight text-gray-900">
              One Platform for Every Turf Booking
            </h2>

            <p className="mt-5 leading-8 text-gray-600">
              Our platform connects players with multiple turf owners in one
              place. Search nearby venues, check slot availability, and book
              instantly. Turf owners can manage turfs, slots and bookings from a
              simple dashboard.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button className="rounded-lg bg-gray-900 px-6 py-3 font-medium text-white transition hover:bg-black">
                Explore Turfs
              </button>

              <button className="flex items-center gap-2 rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-100">
                Register Turf
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-gray-50 p-8">
            <div className="grid grid-cols-2 gap-5">
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h3 className="text-3xl font-bold text-gray-900">100+</h3>
                <p className="mt-1 text-sm text-gray-500">Sports Turfs</p>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h3 className="text-3xl font-bold text-gray-900">5K+</h3>
                <p className="mt-1 text-sm text-gray-500">Players</p>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h3 className="text-3xl font-bold text-gray-900">10K+</h3>
                <p className="mt-1 text-sm text-gray-500">Bookings</p>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h3 className="text-3xl font-bold text-gray-900">20+</h3>
                <p className="mt-1 text-sm text-gray-500">Cities</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900">
              Why Choose Us?
            </h3>

            <p className="mt-3 text-gray-500">
              Everything you need to discover and manage sports turfs.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group rounded-2xl border border-gray-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-5 inline-flex rounded-xl bg-gray-100 p-3 text-emerald-600 transition group-hover:bg-emerald-50">
                  {feature.icon}
                </div>

                <h4 className="text-lg font-semibold text-gray-900">
                  {feature.title}
                </h4>

                <p className="mt-3 text-sm leading-7 text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-20 rounded-3xl border border-gray-200 bg-gray-50 p-8">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900">
              How It Works
            </h3>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-4">
            {[
              "Search Turfs",
              "Choose Slot",
              "Book Online",
              "Play & Enjoy",
            ].map((item, index) => (
              <div
                key={index}
                className="rounded-2xl bg-white p-6 text-center shadow-sm"
              >
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-sm font-bold text-white">
                  {index + 1}
                </div>

                <h4 className="mt-4 font-semibold text-gray-900">{item}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 rounded-3xl border border-gray-200 bg-white p-10 text-center">
          <h3 className="text-3xl font-bold text-gray-900">
            Ready to Book Your Next Match?
          </h3>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Find the best sports turfs around you or register your own turf and
            start receiving bookings through our platform.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button className="rounded-lg bg-gray-900 px-6 py-3 font-medium text-white transition hover:bg-black">
              Explore Turfs
            </button>

            <button className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-100">
              Register Turf
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;