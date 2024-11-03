import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutAdmin from "../admin/layout/Layout";
import NotFound from "../PageNotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutAdmin />,
    children: [
      {
        index: true,
        path: "branch",
        element: <h1>Branch</h1>,
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
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
