import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";
import SlotAvailabilityModal from "../components/Model/SlotAvailabilityModal";
import { useEffect, useState } from "react";
import API from "../api/axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import AboutSection from "../pages/About"
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
  const [selectedTurf, setSelectedTurf] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("details");

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

  const displayTurfs = [
    ...turfs,
    ...Array(Math.max(0, 5 - turfs.length)).fill(null),
  ];
  return (
    <>
      <Navbar />

      <HeroSection/>

      <section
        id="explore"
        className="relative overflow-hidden bg-white py-15"
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
            <div className="relative mt-4">
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
                {displayTurfs.map((turf, index) => (
                  <SwiperSlide
                    key={turf?.id || `coming-${index}`}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {turf ? (
                      <TurfCard
                        turf={turf}
                        onViewDetails={() => {
                          setSelectedTurf(turf);
                          setModalMode("details");
                          setShowModal(true);
                        }}
                        onCheckSlot={() => {
                          setSelectedTurf(turf);
                          setModalMode("booking");
                          setShowModal(true);
                        }}
                      />
                    ) : (
                      <div className="w-full max-w-[300px] h-[420px] lg:h-[320px] rounded-3xl bg-gradient-to-br from-slate-100 to-slate-200 border-2 border-dashed border-slate-300 shadow-md flex flex-col items-center justify-center text-center p-6">
                        <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow">
                          🚧
                        </div>

                        <h3 className="mt-5 text-2xl font-bold text-slate-700">
                          Coming Soon
                        </h3>

                        <p className="mt-2 text-slate-500">
                          A new premium turf will be available here soon.
                        </p>

                        <span className="mt-5 rounded-full bg-emerald-100 text-emerald-700 px-4 py-2 text-sm font-semibold">
                          Stay Tuned
                        </span>
                      </div>
                    )}
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

        {
          showModal && (
            <SlotAvailabilityModal
              turf={selectedTurf}
              mode={modalMode}
              onClose={() => setShowModal(false)}
            />
          )
        }
      </section>

      <section id="about">
        <AboutSection />
      </section>

      <Footer />
    </>
  );
}