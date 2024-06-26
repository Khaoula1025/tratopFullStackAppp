import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import GestLayout from "./components/GestLayout";
import DefaultLayout from "./components/DefaultLayout";
import LadingPage from "./pages/LadingPage";
import Travaux from "./components/Travaux";
import { DynamicForm } from "./components/DynamicForm";
import Historique from "./pages/Historique";
import UserManagement from "./pages/UserManagement";
import Profil from "./pages/Profil";
import MesOperations from "./pages/MesOperations";
import NewHome from "./pages/NewHome";
import { Home } from "./pages/Home";
import HomeHome from "./pages/HomeHome";
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
        path: "/mesOperations",
        element: <MesOperations />,
      },
      {
        path: "/getionDesUtilisateurs",
        element: <UserManagement />,
      },
      {
        path: "/profil",
        element: <Profil />,
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
      {
        path: "/homen",
        element: <NewHome />,
      },
      {
        path: "/home",
        element: <HomeHome />,
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
