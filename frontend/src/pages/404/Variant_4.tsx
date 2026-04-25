import { useState, useEffect } from "react";
import { Home, Headphones, Search, Target } from "lucide-react";
import variant_3_image from "@/assets/variant_4.jpg";

export const Variant_4 = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fade = (delay = "") =>
    `transition-all duration-700 ${delay} ${
      mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
    }`;

  return (
    <div className="min-h-screen bg-[#dde6f5] flex items-center justify-center px-6 py-12">
      <div className="flex flex-col md:flex-row items-center gap-10 max-w-3xl w-full">
        {/* LEFT — Bottle card */}
        <div className="p-6 bg-[#FFFFFF] rounded-3xl">
          <img src={variant_3_image} />
        </div>

        {/* RIGHT — Content */}
        <div className="flex flex-col gap-5 w-full">
          {/* Badge */}
          <div className={fade("delay-100")}>
            <span className="text-[11px] font-semibold tracking-widest text-slate-500 bg-white/80 border border-slate-200 rounded-full px-3 py-1 uppercase shadow-sm">
              404 Error
            </span>
          </div>

          {/* Heading */}
          <h1
            className={`text-4xl font-bold text-slate-800 leading-tight ${fade("delay-150")}`}
          >
            Every lost story has a{" "}
            <span className="text-blue-600">path back home.</span>
          </h1>

          {/* Subtext */}
          <p
            className={`text-slate-500 text-[15px] leading-relaxed max-w-sm ${fade("delay-200")}`}
          >
            This page might be adrift, but we can help you find what you're
            actually looking for.
          </p>

          {/* Buttons */}
          <div className={`flex flex-wrap gap-3 ${fade("delay-300")}`}>
            <button
              onClick={() => navigation.navigate("/")}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold px-6 py-3 rounded-full shadow-md shadow-blue-200 transition-all duration-200"
            >
              <Home className="w-4 h-4" strokeWidth={2} />
              Go Back Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
