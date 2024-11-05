import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Hero from "../../components/renter/hero/Hero";
import BookingField from "../../pages/BookingField";
import Home from "../../pages/Home";
import LayoutAdmin from "../admin/layout/Layout";
import Field from "../admin/pages/field/Field";
import Login from "../Login";
import NotFound from "../PageNotFound";
import Branch from "../admin/pages/branch/Branch";
import Booking from "../admin/pages/booking/Booking";
import User from "../admin/pages/user/user";
import Role from "../admin/pages/role/role";

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
    path: "*",
    element: <NotFound />,
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
