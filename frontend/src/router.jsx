import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import GestLayout from "./components/GestLayout";
import DefaultLayout from "./components/DefaultLayout";
import Dashboard from "./pages/Dashboard";
import LadingPage from "./pages/LadingPage";
import Travaux from "./components/Travaux";
import { DynamicForm } from "./components/DynamicForm";
import Historique from "./pages/Historique";
const routes = [
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Travaux />,
      },
      {
        path: "/historique",
        element: <Historique />,
      },
      {
        path: "DynamicForm/:travauType", // Adjusted to correctly capture the travauType parameter
        element: <DynamicForm />,
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
