import {
  Facebook,
  Instagram,
  Twitter,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300">

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-4 gap-10">

          <div>

            <h2 className="text-3xl font-black text-white mb-4">
              TURF<span className="text-green-500">BOOK</span>
            </h2>

            <p className="leading-7 text-slate-400">
              Discover and book the best sports turfs in your city.
              Cricket, Football, Badminton, Tennis and much more.
            </p>

          </div>

          <div>

            <h3 className="text-white font-semibold mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3">

              <li>Home</li>
              <li>Explore</li>
              <li>Sports</li>
              <li>About</li>

            </ul>

          </div>

          <div>

            <h3 className="text-white font-semibold mb-5">
              Contact
            </h3>

            <div className="space-y-4">

              <div className="flex gap-3">
                <MapPin size={18} />
                Mumbai, India
              </div>

              <div className="flex gap-3">
                <Phone size={18} />
                +91 9999999999
              </div>

              <div className="flex gap-3">
                <Mail size={18} />
                support@turfbook.com
              </div>

            </div>

          </div>

          <div>

            <h3 className="text-white font-semibold mb-5">
              Follow Us
            </h3>

            <div className="flex gap-5">

              <Facebook />

              <Instagram />

              <Twitter />

            </div>

          </div>

        </div>

        <div className="border-t border-slate-800 mt-14 pt-6 text-center text-sm text-slate-500">
          © 2026 TurfBook. All Rights Reserved.
        </div>

      </div>

    </footer>
  );
};

export default Footer;