import AuthCallBack from "@/components/AuthCallBack.jsx";
import { Home } from "@/pages/Home.tsx";
import { ItemDetail } from "@/pages/ItemDetail";
import { LostAndFound } from "@/pages/LostAndFound";
import { Community } from "@/pages/Community";
import { Profile } from "@/pages/Profile";
import { NotFound } from "@/pages/NotFound.tsx";

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
    path: "/community",
    element: <Community />,
  },

  {
    path: "/profile",
    element: <Profile />,
  },

  {
    path: "*",
    element: <NotFound />,
  },
];
