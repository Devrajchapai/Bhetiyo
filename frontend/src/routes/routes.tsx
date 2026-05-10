import { Home } from "@/pages/Home.tsx";
import { NotFound } from "@/pages/NotFound.tsx";
import { useNavigationBar } from "@/store/ui/navigationBar";
import { Loader } from "lucide-react";

export const routes = [
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "*",
    element: <NotFound />,
  },
];
