import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";

import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Gallery from "./pages/Gallery";
import Tours from "./pages/Tours";
import Contact from "./pages/Contact";
import PlaceDetails from "./pages/PlaceDetails";
import Booking from "./pages/Booking";
import TourDetails from "./pages/TourDetails";
import NotFound from "./pages/NotFound";

import Login from "./pages/Login";
import Register from "./pages/Register";
import MyBookings from "./pages/MyBookings";

export default function App() {
  return (<BrowserRouter> <Navbar />

    ```
    <Routes>
      {/* Home */}
      <Route path="/" element={<Home />} />

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Main pages */}
      <Route path="/explore" element={<Explore />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/tours" element={<Tours />} />
      <Route path="/my-bookings" element={<MyBookings />} />
      <Route path="/contact" element={<Contact />} />

      {/* Place details */}
      <Route path="/place/:id" element={<PlaceDetails />} />

      {/* Tour details */}
      <Route path="/tour/:id" element={<TourDetails />} />

      {/* Booking */}
      <Route path="/booking/:id" element={<Booking />} />
      <Route path="/booking/tour/:id" element={<Booking />} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>


  );
}
