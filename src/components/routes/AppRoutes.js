import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FieldDetail from "../../components/renter/booking/FieldDetail";
import Hero from "../../components/renter/hero/Hero";
import HistoryBooking from "../../components/renter/historybooking/History";
import BookingField from "../../pages/BookingField";
import LayoutAdmin from "../admin/layout/Layout";
import Booking from "../admin/pages/booking/Booking";
import Branch from "../admin/pages/Branch/Branch";
import Field from "../admin/pages/Field/Field";
import Role from "../admin/pages/role/role";
import User from "../admin/pages/user/user";
import Signup from "../branch_manager/Signup";
import Login from "../Login";
import NotFound from "../PageNotFound";
import BookingForm from "../renter/booking_form/BookingForm";
import Footer from "../renter/footer/Footer";
import Header from "../renter/header/Header"; // Điều chỉnh đường dẫn theo cấu trúc của bạn
import Profile from "../renter/profile/Profile";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <LayoutAdmin />,
    children: [
      {
        index: true,
        path: "branchs",
        element: <Branch />,
      },
      {
        path: "fields",
        element: <Field />,
      },
      {
        path: "bookings",
        element: <Booking />,
      },
      {
        path: "users",
        element: <User />,
      },
      {
        path: "roles",
        element: <Role />,
      },
    ],
  },
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
        <Profile />
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
    path: "/",
    element: <Hero />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
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
