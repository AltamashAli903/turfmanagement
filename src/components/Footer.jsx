import { MapPin, Phone, Mail } from "lucide-react";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "Explore", href: "#explore" },
    { name: "Sports", href: "#sports" },
    { name: "About", href: "#about" },
  ];

  return (
    <footer className="bg-black text-slate-300" id="contact">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">

        {/* Top */}
        <div className="grid gap-12 text-center sm:grid-cols-2 lg:grid-cols-4 lg:text-left">

          {/* Brand */}
          <div>
            <h2 className="text-3xl font-extrabold tracking-wide text-white">
              TURF<span className="text-emerald-500">BOOK</span>
            </h2>

            <p className="mt-5 text-sm leading-7 text-slate-400">
              Discover and book premium sports turfs across your city.
              Cricket, Football, Badminton, Tennis and more with instant
              online booking.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="transition hover:text-emerald-500"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Contact
            </h3>

            <div className="space-y-4 text-sm">

              <div className="flex items-center justify-center gap-3 lg:justify-start">
                <MapPin
                  size={18}
                  className="shrink-0 text-emerald-500"
                />
                <span>Nagpur, Maharashtra, India</span>
              </div>

              <div className="flex items-center justify-center gap-3 lg:justify-start">
                <Phone
                  size={18}
                  className="shrink-0 text-emerald-500"
                />
                <span>+91 9834588923</span>
              </div>

              <div className="flex items-center justify-center gap-3 lg:justify-start">
                <Mail
                  size={18}
                  className="shrink-0 text-emerald-500"
                />
                <span>support@turfbook.com</span>
              </div>

            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Follow Us
            </h3>

            <div className="flex justify-center gap-4 lg:justify-start">

              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 transition-all duration-300 hover:border-emerald-500 hover:bg-emerald-500 hover:text-white"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 transition-all duration-300 hover:border-emerald-500 hover:bg-emerald-500 hover:text-white"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 transition-all duration-300 hover:border-emerald-500 hover:bg-emerald-500 hover:text-white"
              >
                <FaXTwitter />
              </a>

            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-slate-800 pt-6">

          <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-slate-500 md:flex-row">

            <p>
              © {new Date().getFullYear()} TurfBook. All rights reserved.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-5">

              <a
                href="#"
                className="transition hover:text-emerald-500"
              >
                Privacy Policy
              </a>

              <a
                href="#"
                className="transition hover:text-emerald-500"
              >
                Terms & Conditions
              </a>

            </div>

          </div>

        </div>

      </div>
    </footer>
  );
}