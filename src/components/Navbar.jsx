import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Explore", href: "#explore" },
    { name: "Sports", href: "#sports" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled
          ? "border-b border-white/10 bg-black/70 backdrop-blur-xl"
          : "bg-transparent"
          }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">

          {/* Logo */}
          <a
            href="#home"
            className="text-2xl font-black tracking-wider text-white sm:text-3xl"
          >
            TURF<span className="text-emerald-500">BOOK</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="group relative font-medium text-white transition hover:text-emerald-400"
              >
                {item.name}

                <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-emerald-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Desktop Button */}
          <div className="hidden lg:flex items-center gap-4">
            {/* <a
              href="#explore"
              className="rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
            >
              Book Now
            </a> */}

            <Link
              to="/login"
              className="rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
            >
              Login As Admin
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen(true)}
            className="rounded-lg p-2 text-white transition hover:bg-white/10 lg:hidden"
          >
            <Menu size={28} />
          </button>
        </div>
      </header>

      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/50 transition-all duration-300 lg:hidden ${open ? "visible opacity-100" : "invisible opacity-0"
          }`}
      />

      {/* Mobile Drawer */}
      <aside
        className={`fixed right-0 top-0 z-50 h-screen w-72 bg-emerald-950 shadow-2xl transition-transform duration-300 lg:hidden ${open ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Drawer Header */}
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">

          <h2 className="text-2xl font-black text-white">
            TURF<span className="text-emerald-500">BOOK</span>
          </h2>

          <button
            onClick={() => setOpen(false)}
            className="rounded-lg p-2 text-white transition hover:bg-white/10"
          >
            <X size={28} />
          </button>

        </div>

        {/* Drawer Navigation */}
        <nav className="mt-4">

          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block border-b border-white/5 px-6 py-4 text-white transition hover:bg-white/5 hover:text-emerald-400"
            >
              {item.name}
            </a>
          ))}

        </nav>

        {/* Button */}
        <div className="p-6">
          <a
            href="#explore"
            onClick={() => setOpen(false)}
            className="block rounded-full bg-emerald-600 py-3 text-center font-semibold text-white transition hover:bg-emerald-700"
          >
            Book Now
          </a>
          <Link to="/login">
            <a className="block rounded-full bg-emerald-600 py-3 mt-4 text-center font-semibold text-white transition hover:bg-emerald-700">
              Login As Admin
            </a>
          </Link>
        </div>

      </aside>
    </>
  );
}