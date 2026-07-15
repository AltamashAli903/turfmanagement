import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import API from "../api/axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Loader from "../components/Ui/Loader";
import Toast from "../components/Ui/Toast";
import SectionTitle from "../components/Ui/SectionTitle";
import TurfCard from "../components/Ui/TurfCard";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [turfs, setTurfs] = useState([]);
  const [toast, setToast] = useState(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    fetchTurfs();
  }, []);

  const fetchTurfs = async () => {
    try {
      const res = await API.get("/turf/list");

      if (res.data.success) {
        setTurfs(res.data.data);
      }
    } catch (err) {
      setToast({
        message: "Unable to load turfs.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Navbar />

      <HeroSection />

      <section
        id="explore"
        className="bg-white py-20"
      >
        <div className="mx-auto max-w-[92%] px-5">

          <SectionTitle
            badge="Explore"
            title="Featured Turfs"
            subtitle="Discover premium sports venues around your city."
          />

          {loading ? (
            <Loader text="Loading Turfs..." />
          ) : (
            <div className="relative mt-16">
              {/* Left Arrow */}
              <button
                className="custom-prev absolute left-[-35px] lg:left-[-50px] top-1/2 z-30 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg transition hover:bg-emerald-500 hover:text-white">
                <ChevronLeft size={20} />
              </button>

              {/* Swiper */}
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation={{
                  prevEl: ".custom-prev",
                  nextEl: ".custom-next",
                }}
                pagination={{
                  clickable: true,
                }}
                autoplay={{
                  delay: 3500,
                  disableOnInteraction: false,
                }}
                loop={true}
                spaceBetween={28}
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                  },
                  640: {
                    slidesPerView: 2,
                  },
                  1024: {
                    slidesPerView: 4,
                  },
                }}
              >
                {turfs.map((turf) => (
                  <SwiperSlide
                    key={turf.id}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <TurfCard turf={turf} />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Right Arrow */}
              <button
                className="custom-next absolute right-[-30px] lg:right-[-50px] top-1/2 z-30 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg transition hover:bg-emerald-500 hover:text-white"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}

        </div>

        {toast && (
          <Toast
            {...toast}
            onClose={() => setToast(null)}
          />
        )}
      </section>

      <Footer />
    </>
  );
}