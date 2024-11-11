import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutAdmin from "../admin/layout/Layout";
import NotFound from "../PageNotFound";
import Branch from "../admin/pages/Branch/Branch";
import Login from "../Login";
import Hero from "../../components/renter/hero/Hero";
import BookingField from "../../pages/BookingField";
import HistoryBooking from "../../components/renter/historybooking/History";
import FieldDetail from "../../components/renter/booking/FieldDetail";

import Header from "../renter/header/Header"; // Điều chỉnh đường dẫn theo cấu trúc của bạn
import Footer from "../renter/footer/Footer";
import Profile from "../renter/profile/Profile";
import BookingForm from "../renter/booking_form/BookingForm";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <LayoutAdmin />,
    children: [
      { index: true, path: "branch", element: <Branch /> },
      { path: "field", element: <h1>Field</h1> },
      { path: "booking", element: <h1>Booking</h1> },
      { path: "users", element: <h1>User</h1> },
      { path: "role", element: <h1>Role</h1> },
    ],
  },
  // -----User-----
  {
    path: "/user/home",
    index: true,
    element: (
      <>
        <BookingField />
        <Footer />
      </>
    ),
  },
  {
    path: "/user/booking/field/:fieldId",
    element: (
      <>
        <Header />
        <FieldDetail />
        <Footer />
      </>
    ),
  },
  {
    path: "/user/history",
    element: (
      <>
        <Header />
        <HistoryBooking />
        <Footer />
      </>
    ),
  },
  {
    path: "/user/profile",
    element: (
      <>
        <Header />
        <Profile/>
        <Footer />
      </>
    ),
  },
  {
    path: "/user/booking/field/:id/book",
    element: (
      <>
        <Header />
        <BookingForm />
        <Footer />
      </>
    ),
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Hero />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;