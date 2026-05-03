// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Register from "../pages/Register";
// import Login from "../pages/Login";
// import Slots from "../pages/Slots";
// import DashboardLayout from "../layouts/DashboardLayout";
// import Dashboard from "../pages/Dashboard";
// import Bookings from "../pages/Booking";
// import Turf from "../pages/Turf";

// export default function AppRoutes() {

//   return (

//     <BrowserRouter>

//       <Routes>

//         <Route path="/register" element={<Register />}/>
//         <Route path="/" element={<Login />} />
//         <Route path="/login"element={<Login />} />
//         <Route path="/dashboard" element={ <DashboardLayout> <Dashboard/> </DashboardLayout>} />
//         <Route path="/slots" element={ <DashboardLayout> <Slots /></DashboardLayout>  } />
//         <Route path="/bookings" element={ <DashboardLayout> <Bookings /></DashboardLayout>  } />
//         <Route path="/turf" element={ <DashboardLayout> <Turf /></DashboardLayout>  } />

//       </Routes>

//     </BrowserRouter>

//   );

// }

import { BrowserRouter, Routes, Route } from "react-router-dom";

/* AUTH */
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";

/* ADMIN PAGES */
import Slots from "../pages/AdminPages/Slots";
import Dashboard from "../pages/AdminPages/Dashboard";
import Bookings from "../pages/AdminPages/Booking";
import Turf from "../pages/AdminPages/Turf";

/* PUBLIC PAGES */
import Home from "../pages/PublicPages/Home";
// import TurfList from "../pages/PublicPages/TurfList";
// import TurfDetails from "../pages/PublicPages/TurfDetails";
// import BookingPage from "../pages/PublicPages/Booking";
// import Contact from "../pages/PublicPages/Contact";

/* LAYOUTS */
import DashboardLayout from "../layouts/DashboardLayout";
// import PublicLayout from "../layouts/PublicLayout";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

          {/* { 🌐 PUBLIC WEBSITE */}
          {/* <Route path="/" element={ */}
            {/* <PublicLayout> */}
              {/* <Home /> */}
            {/* </PublicLayout> */}
          {/* } /> */}

        {/* <Route path="/turfs" element={
          <PublicLayout>
            <TurfList />
          </PublicLayout>
        } />

        <Route path="/turf/:id" element={
          <PublicLayout>
            <TurfDetails />
          </PublicLayout>
        } />

        <Route path="/booking/:id" element={
          <PublicLayout>
            <BookingPage />
          </PublicLayout>
        } />

        <Route path="/contact" element={
          <PublicLayout>
            <Contact />
          </PublicLayout>
        } />  */}

        {/* 🔐 AUTH */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/admin/register" element={<Register />} />

        {/* 🔒 ADMIN PANEL */}
        <Route path="/admin/dashboard" element={
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        } />

        <Route path="/admin/slots" element={
          <DashboardLayout>
            <Slots />
          </DashboardLayout>
        } />

        <Route path="/admin/bookings" element={
          <DashboardLayout>
            <Bookings />
          </DashboardLayout>
        } />

        <Route path="/admin/turf" element={
          <DashboardLayout>
            <Turf />
          </DashboardLayout>
        } />

      </Routes>
    </BrowserRouter>
  );
}
