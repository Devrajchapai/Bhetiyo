import AuthCallBack from "@/components/AuthCallBack.jsx";
import { Home } from "@/pages/Home.tsx";
import { ItemDetail } from "@/pages/ItemDetail";
import { LostAndFound } from "@/pages/LostAndFound";
import { NotFound } from "@/pages/NotFound.tsx";
import { useNavigationBar } from "@/store/ui/navigationbar";
import { Loader } from "lucide-react";

export const routes = [
  {
    path: "/callback",
    element: <AuthCallBack />,
  },
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/items",
    element: <LostAndFound />,
  },

  {
    path: "/items/:slug",
    element: <ItemDetail />,
  },

  {
    path: "*",
    element: <NotFound />,
  },
];
