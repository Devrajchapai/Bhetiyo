import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes/routes.js";
import { NavigationBar } from "./components/NavigationBar.js";
import { Footer } from "./components/Footer.js";
import { SignUp } from "./components/Signup.js";
import { ReportItemModal } from "./components/ReportIteModal.js";
import { Map } from "./components/Map.js";

function App() {
  const router = createBrowserRouter(routes);
  useEffect(() => {
    document.title = "Bhetiyo";
  });
  return (
    <>
      <NavigationBar />
      <SignUp />
      <ReportItemModal />
      <Map />
      <RouterProvider router={router} />
      <Footer />
    </>
  );
}

export default App;
