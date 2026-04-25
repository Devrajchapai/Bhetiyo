import { useState, useEffect } from "react";
import { ArrowLeft, Flag, Key, PawPrint, Navigation } from "lucide-react";

function TopoBackground() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="bgRadial" cx="50%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#dde3ef" />
        </radialGradient>
      </defs>
      <rect width="1200" height="700" fill="url(#bgRadial)" />

      {/* Topographic contour lines */}
      {[
        "M-100,350 C100,280 200,420 400,360 C600,300 700,440 900,370 C1100,300 1200,380 1400,340",
        "M-100,320 C100,250 220,400 420,335 C620,270 720,415 920,345 C1120,275 1200,355 1400,315",
        "M-100,290 C80,220 240,385 440,310 C640,235 740,395 940,320 C1140,245 1200,330 1400,285",
        "M-100,380 C120,315 180,445 380,385 C580,325 680,460 880,390 C1080,320 1200,405 1400,368",
        "M-100,410 C140,350 160,465 360,415 C560,365 660,480 860,415 C1060,350 1200,430 1400,395",
        "M-100,440 C160,385 140,480 340,445 C540,405 640,500 840,440 C1040,380 1200,455 1400,422",
        "M-100,260 C60,195 260,368 460,285 C660,202 760,370 960,295 C1160,220 1200,305 1400,255",
        "M-100,230 C40,168 280,350 480,258 C680,166 780,348 980,268 C1180,188 1200,278 1400,222",
        "M-100,470 C180,420 120,498 320,472 C520,446 618,520 820,465 C1020,410 1200,478 1400,450",
        "M-100,500 C200,455 100,515 300,500 C500,485 598,540 800,490 C1000,440 1200,500 1400,478",
        "M-100,180 C20,142 300,332 500,230 C700,128 800,326 1000,242 C1200,158 1200,252 1400,190",
        "M-100,530 C220,490 80,535 280,526 C480,518 575,558 780,516 C980,474 1200,522 1400,506",
        "M-100,155 C0,118 320,315 520,205 C720,95 820,308 1020,218 C1220,128 1200,228 1400,162",
        "M-100,560 C240,524 60,552 260,551 C460,550 552,576 760,540 C960,504 1200,544 1400,530",
      ].map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke="#b8c4d8"
          strokeWidth="1.2"
          opacity={0.45 - i * 0.01}
        />
      ))}

      {/* Soft glow blob in center */}
      <ellipse
        cx="600"
        cy="320"
        rx="320"
        ry="220"
        fill="white"
        opacity="0.25"
      />
    </svg>
  );
}

export const Variant_2 = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fade = (delay = "") =>
    `transition-all duration-700 ${delay} ${
      mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
    }`;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-12 bg-slate-200">
      <TopoBackground />

      {/* Floating scattered icons */}
      <div
        className={`absolute top-16 left-16 transition-all duration-1000 delay-700 ${mounted ? "opacity-100" : "opacity-0"}`}
      >
        <Key className="w-6 h-6 text-blue-400 opacity-60" strokeWidth={1.5} />
      </div>
      <div
        className={`absolute top-24 right-20 transition-all duration-1000 delay-1000 ${mounted ? "opacity-100" : "opacity-0"}`}
      >
        <PawPrint
          className="w-6 h-6 text-teal-400 opacity-50"
          strokeWidth={1.5}
        />
      </div>
      <div
        className={`absolute bottom-28 right-16 transition-all duration-1000 delay-900 ${mounted ? "opacity-100" : "opacity-0"}`}
      >
        <Navigation
          className="w-6 h-6 text-amber-400 opacity-55"
          strokeWidth={1.5}
          style={{ transform: "rotate(20deg)" }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl w-full gap-6">
        {/* Lightbulb circle */}
        <div
          className={`transition-all duration-700 ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
        >
          <div
            className="relative w-36 h-36 rounded-full bg-white shadow-2xl flex items-center justify-center"
            style={{
              boxShadow:
                "0 8px 48px 0 rgba(96,130,220,0.18), 0 2px 16px 0 rgba(0,0,0,0.08)",
            }}
          >
            {/* Subtle ring */}
            <div className="absolute inset-0 rounded-full border-2 border-blue-100 opacity-60" />
            <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center shadow-lg">
              {/* Lightbulb SVG */}
              <svg
                viewBox="0 0 40 40"
                className="w-11 h-11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="20" cy="20" r="20" fill="#2563eb" />
                {/* Bulb body */}
                <path
                  d="M20 8C15.6 8 12 11.6 12 16C12 19.2 13.8 22 16.5 23.4V26C16.5 26.6 17 27 17.5 27H22.5C23 27 23.5 26.6 23.5 26V23.4C26.2 22 28 19.2 28 16C28 11.6 24.4 8 20 8Z"
                  fill="white"
                />
                {/* Base lines */}
                <rect
                  x="17"
                  y="28"
                  width="6"
                  height="1.5"
                  rx="0.75"
                  fill="white"
                  opacity="0.9"
                />
                <rect
                  x="17.5"
                  y="30.5"
                  width="5"
                  height="1.5"
                  rx="0.75"
                  fill="white"
                  opacity="0.7"
                />
                {/* Y letter inside bulb */}
                <text
                  x="20"
                  y="22"
                  textAnchor="middle"
                  fontSize="8"
                  fontWeight="bold"
                  fill="#2563eb"
                >
                  Y
                </text>
              </svg>
            </div>
          </div>
        </div>

        {/* Heading */}
        <h1
          className={`text-4xl sm:text-5xl font-black text-slate-800 leading-tight tracking-tight ${fade("delay-150")}`}
        >
          Whoops! Even the best
          <br />
          finders take a detour
          <br />
          sometimes.
        </h1>

        {/* Subtext */}
        <p
          className={`text-slate-500 text-base sm:text-lg leading-relaxed max-w-lg ${fade("delay-200")}`}
        >
          This page seems to have wandered off the map. But don't worry, every
          story has a path back home, and we'll help you find yours.
        </p>

        {/* Buttons */}
        <div
          className={`flex flex-wrap gap-3 justify-center ${fade("delay-300")}`}
        >
          <button
            onClick={() => {
              navigation.navigate("/");
            }}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold px-7 py-3.5 rounded-full shadow-lg transition-all duration-200"
          >
            Back to Safety (Home)
          </button>
        </div>

        {/* Coordinates */}
        <div
          className={`flex items-center gap-2 text-xs font-mono text-slate-400 tracking-widest uppercase ${fade("delay-500")}`}
        >
          <span>LAT: 40.7128</span>
          <span className="w-1 h-1 rounded-full bg-slate-400 inline-block" />
          <span>LONG: -74.0060</span>
        </div>
      </div>
    </div>
  );
};
