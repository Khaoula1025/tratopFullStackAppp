import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import GestLayout from "./components/GestLayout";
import DefaultLayout from "./components/DefaultLayout";
import Dashboard from "./pages/Dashboard";
import LadingPage from "./pages/LadingPage";
import DataEntryForm from "./pages/DataEntryForm";

const routes = [
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/Dashboard" />,
      },
      {
        path: "/DataEntry",
        element: <DataEntryForm />,
      },
      {
        path: "/Dashboard",
        element: <Dashboard />,
      },
    ],
  },

  {
    path: "/",
    element: <GestLayout />,
    children: [
      {
        path: "/LandingPage",
        element: <LadingPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

const router = createBrowserRouter(routes);
export default router;
