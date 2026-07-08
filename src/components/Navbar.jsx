import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
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
    "Home",
    "Explore",
    "Sports",
    "About",
    "Contact",
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/70 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="h-20 flex items-center justify-between">

          {/* Logo */}

          <h1 className="text-3xl font-black text-white tracking-wider">
            TURF<span className="text-green-500">BOOK</span>
          </h1>

          {/* Desktop */}

          <nav className="hidden md:flex gap-10">

            {navItems.map((item) => (

              <a
                key={item}
                href="/"
                className="relative text-white font-medium hover:text-green-400 transition group"
              >
                {item}

                <span className="absolute left-0 -bottom-2 h-[2px] w-0 bg-green-500 transition-all duration-300 group-hover:w-full"></span>

              </a>

            ))}

          </nav>

          {/* Button */}

          <button className="hidden md:block px-6 py-3 rounded-full bg-green-600 hover:bg-green-700 text-white font-semibold transition">
            Book Now
          </button>

          {/* Mobile */}

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white"
          >
            {open ? <X /> : <Menu />}
          </button>

        </div>
      </div>

      {open && (
        <div className="md:hidden bg-black/90 backdrop-blur-lg">

          {navItems.map((item) => (
            <a
              key={item}
              href="/"
              className="block py-4 px-6 text-white border-b border-white/10"
            >
              {item}
            </a>
          ))}

        </div>
      )}
    </header>
  );
};

export default Navbar;