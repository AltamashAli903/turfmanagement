import { BrowserRouter, Route , Routes} from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Slots from "../pages/Slots";
import Dashboard from "../pages/Dashboard";
import Bookings from "../pages/Booking";
import Turf from "../pages/Turf";
import Home from "../pages/Home"
import TurfGallery from "../pages/TurfGallery";

export default function AppRoutes() {
  return (
    <BrowserRouter basename="/turfmanagement/">
    <Routes>
    {/* <Route path="/" element={<Login />} /> */}
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/slots" element={<Slots />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/bookings" element={<Bookings />} />
    <Route path="/turf" element={<Turf />} />
    <Route path="/turf/gallery/:id"element={<TurfGallery />}/>
    </Routes>
    </BrowserRouter>
  )};