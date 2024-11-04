import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutAdmin from "../admin/layout/Layout";
import NotFound from "../PageNotFound";
import Branch from "../admin/pages/Branch/Branch";
import Login from "../Login";
import Hero from "../../components/renter/hero/Hero";
import Spinner from "../admin/global/Spinner";
import Home from "../../pages/Home";
import BookingField from "../../pages/BookingField";

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
        element: <h1>Field</h1>,
      },
      {
        path: "booking",
        element: <h1>Booking</h1>,
      },
      {
        path: "users",
        element: <h1>User</h1>,
      },
      {
        path: "role",
        element: <h1>Role</h1>,
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
