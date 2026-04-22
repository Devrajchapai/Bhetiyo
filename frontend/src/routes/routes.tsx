import { Home } from "@/pages/Home.tsx";
import { NotFound } from "@/pages/NotFound.tsx";

export const routes = [
  {
    path: "/",
    element: <Home />,
  },

  { path: "*", element: <NotFound /> },
];
