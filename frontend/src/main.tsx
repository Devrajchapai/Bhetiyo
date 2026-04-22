import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { AuthProvider } from "./contexts/AuthContext";
// import { SocketProvider } from "./contexts/SocketContext";
import { Toaster } from "sonner";

import App from "./App.js";
import "./index.css";

type Position =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top-center"
  | "bottom-center";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const Root = () => {
  const [toasterPosition, setToasterPosition] =
    useState<Position>("bottom-right");
  const [toasterStyle, setToasterStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setToasterPosition("bottom-center");
        setToasterStyle({ bottom: "90px" });
      } else {
        setToasterPosition("top-right");
        setToasterStyle({});
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        {/* <AuthProvider>
          <SocketProvider> */}
        <App />
        {/* </SocketProvider> */}
        <Toaster
          position={toasterPosition}
          style={toasterStyle}
          richColors
          expand={false}
          closeButton
        />
        {/* </AuthProvider> */}
      </QueryClientProvider>
    </React.StrictMode>
  );
};

declare global {
  var __reactRoot: ReturnType<typeof ReactDOM.createRoot> | null;
}

const rootElement = document.getElementById("root");
if (rootElement) {
  if (!globalThis.__reactRoot) {
    globalThis.__reactRoot = ReactDOM.createRoot(rootElement);
  }
  globalThis.__reactRoot.render(<Root />);
}
