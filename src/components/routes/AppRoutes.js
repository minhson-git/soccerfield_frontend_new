import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Hero from "../../components/renter/hero/Hero";
import BookingField from "../../pages/BookingField";
import Home from "../../pages/Home";
import LayoutAdmin from "../admin/layout/Layout";
import Field from "../admin/pages/field/Field";
import Login from "../Login";
import NotFound from "../PageNotFound";
import Branch from "../admin/pages/Branch/Branch";
import Booking from "../admin/pages/booking/Booking";
import User from "../admin/pages/user/user";
import Role from "../admin/pages/role/role";
import Signup from "../branch_manager/Signup";
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
      {
        index: true,
        path: "branch",
        element: <Branch />,
      },
      {
        path: "field",
        element: <Field />,
      },
      {
        path: "booking",
        element: <Booking />,
      },
      {
        path: "users",
        element: <User />,
      },
      {
        path: "role",
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
    path: "/home",
    element: <Home />,
    children: [
      {
        path: "/home/bookingfield",
        element: <BookingField />,
      },
    ],
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
