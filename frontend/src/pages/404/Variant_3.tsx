import { useState, useEffect } from "react";
import { Home, PlusCircle, Search, Map, HelpCircle } from "lucide-react";
import { Variant_0 } from "./Variant_0";

function CompassSVG() {
  return (
    <svg
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <defs>
        <radialGradient id="bodyGrad" cx="38%" cy="32%" r="70%">
          <stop offset="0%" stopColor="#6b7280" />
          <stop offset="50%" stopColor="#374151" />
          <stop offset="100%" stopColor="#111827" />
        </radialGradient>
        <radialGradient id="faceGrad" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#f9fafb" />
          <stop offset="60%" stopColor="#e5e7eb" />
          <stop offset="100%" stopColor="#d1d5db" />
        </radialGradient>
        <radialGradient id="rimGrad" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#9ca3af" />
          <stop offset="40%" stopColor="#6b7280" />
          <stop offset="100%" stopColor="#1f2937" />
        </radialGradient>
        <filter id="compassShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow
            dx="0"
            dy="6"
            stdDeviation="8"
            floodColor="#1e3a8a"
            floodOpacity="0.25"
          />
        </filter>
        <filter id="needleShadow" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow
            dx="0"
            dy="1"
            stdDeviation="1.5"
            floodColor="#000"
            floodOpacity="0.3"
          />
        </filter>
      </defs>

      {/* Outer metallic rim */}
      <circle
        cx="60"
        cy="60"
        r="52"
        fill="url(#rimGrad)"
        filter="url(#compassShadow)"
      />

      {/* Rim highlight */}
      <circle
        cx="60"
        cy="60"
        r="52"
        fill="none"
        stroke="#9ca3af"
        strokeWidth="1"
        opacity="0.4"
      />

      {/* Inner body */}
      <circle cx="60" cy="60" r="47" fill="url(#bodyGrad)" />

      {/* Face */}
      <circle cx="60" cy="60" r="42" fill="url(#faceGrad)" />

      {/* Degree tick marks */}
      {Array.from({ length: 72 }).map((_, i) => {
        const angle = (i * 5 * Math.PI) / 180;
        const isMajor = i % 9 === 0;
        const inner = isMajor ? 35 : 37;
        const outer = 40;
        const x1 = 60 + inner * Math.sin(angle);
        const y1 = 60 - inner * Math.cos(angle);
        const x2 = 60 + outer * Math.sin(angle);
        const y2 = 60 - outer * Math.cos(angle);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={isMajor ? "#6b7280" : "#9ca3af"}
            strokeWidth={isMajor ? 1.2 : 0.6}
            opacity={isMajor ? 0.9 : 0.5}
          />
        );
      })}

      {/* Cardinal direction labels */}
      <text
        x="60"
        y="26"
        textAnchor="middle"
        fontSize="7"
        fontWeight="bold"
        fill="#1e3a8a"
        fontFamily="sans-serif"
      >
        N
      </text>
      <text
        x="60"
        y="98"
        textAnchor="middle"
        fontSize="6.5"
        fontWeight="600"
        fill="#374151"
        fontFamily="sans-serif"
      >
        S
      </text>
      <text
        x="95"
        y="63"
        textAnchor="middle"
        fontSize="6.5"
        fontWeight="600"
        fill="#374151"
        fontFamily="sans-serif"
      >
        E
      </text>
      <text
        x="25"
        y="63"
        textAnchor="middle"
        fontSize="6.5"
        fontWeight="600"
        fill="#374151"
        fontFamily="sans-serif"
      >
        W
      </text>

      {/* Intercardinal labels */}
      <text
        x="82"
        y="36"
        textAnchor="middle"
        fontSize="5"
        fill="#9ca3af"
        fontFamily="sans-serif"
      >
        NE
      </text>
      <text
        x="36"
        y="36"
        textAnchor="middle"
        fontSize="5"
        fill="#9ca3af"
        fontFamily="sans-serif"
      >
        NW
      </text>
      <text
        x="82"
        y="88"
        textAnchor="middle"
        fontSize="5"
        fill="#9ca3af"
        fontFamily="sans-serif"
      >
        SE
      </text>
      <text
        x="36"
        y="88"
        textAnchor="middle"
        fontSize="5"
        fill="#9ca3af"
        fontFamily="sans-serif"
      >
        SW
      </text>

      {/* Needle - North (red) */}
      <g filter="url(#needleShadow)">
        <polygon points="60,22 56,60 60,58 64,60" fill="#dc2626" />
        <polygon
          points="60,22 64,60 60,58 56,60"
          fill="#ef4444"
          opacity="0.7"
        />
        {/* Needle - South (white/grey) */}
        <polygon points="60,98 56,60 60,62 64,60" fill="#d1d5db" />
        <polygon
          points="60,98 64,60 60,62 56,60"
          fill="#9ca3af"
          opacity="0.8"
        />
      </g>

      {/* Center pivot */}
      <circle cx="60" cy="60" r="4" fill="#374151" />
      <circle cx="60" cy="60" r="2.5" fill="#6b7280" />
      <circle cx="60" cy="60" r="1.2" fill="#d1d5db" />
    </svg>
  );
}

const QUICK_LINKS = [
  {
    icon: <Search className="w-4 h-4 text-emerald-600" />,
    bg: "bg-emerald-50",
    title: "Find Items",
    desc: "Browse recent discoveries in your area.",
  },
  {
    icon: <Map className="w-4 h-4 text-amber-600" />,
    bg: "bg-amber-50",
    title: "Area Map",
    desc: "See lost markers on our community map.",
  },
  {
    icon: <HelpCircle className="w-4 h-4 text-blue-600" />,
    bg: "bg-blue-50",
    title: "Help Center",
    desc: "Get tips on how to recover your property.",
  },
];

export const Variant_3 = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fade = (delay = "") =>
    `transition-all duration-700 ${delay} ${
      mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
    }`;

  return (
    <div className=" bg-linear-to-br from-slate-100 via-blue-50 to-slate-100 flex items-center justify-center px-4 py-12 w-full">
      {/* Card */}
      <div
        className={`relative bg-white rounded-3xl shadow-xl w-full max-w-lg overflow-hidden transition-all duration-700 ${
          mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        {/* Top section */}
        <div className="flex flex-col items-center text-center px-10 pt-10 pb-8">
          {/* Compass */}
          <div
            className={`relative mb-8 transition-all duration-700 delay-100 ${mounted ? "opacity-100" : "opacity-0"}`}
          >
            {/* Outer dashed ring */}
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-blue-200 scale-110 animate-[spin_12s_linear_infinite]" />
            {/* Arrows N/S */}
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5">
              <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-b-[8px] border-transparent border-b-blue-300" />
            </div>
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5">
              <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[8px] border-transparent border-t-blue-300" />
            </div>

            {/* White glow circle */}
            <div className="w-36 h-36 rounded-full bg-gradient-to-br from-white to-blue-50 shadow-[0_4px_32px_rgba(59,130,246,0.15)] flex items-center justify-center">
              {/* Spinning compass needle */}
              <div className="w-24 h-24 animate-[spin_4s_ease-in-out_infinite]">
                <CompassSVG />
              </div>
            </div>
          </div>

          {/* Heading */}
          <h1
            className={`text-3xl font-extrabold text-blue-800 leading-snug mb-3 ${fade("delay-150")}`}
          >
            Your compass is spinning,
            <br />
            but you're not lost.
          </h1>

          {/* Subtext */}
          <p
            className={`text-slate-500 text-sm leading-relaxed max-w-sm mb-7 ${fade("delay-200")}`}
          >
            Sometimes the best discoveries happen when we take a wrong turn.
            Let's get you back on track.
          </p>

          {/* Buttons */}
          <div
            className={`flex flex-wrap gap-3 justify-center ${fade("delay-300")}`}
          >
            <button
              onClick={() => navigation.navigate("/")}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold px-7 py-3 rounded-full shadow-md shadow-blue-200 transition-all duration-200"
            >
              <Home className="w-4 h-4" strokeWidth={2} />
              Go Home
            </button>
          </div>
        </div>

        {/* Divider */}
        <div
          className={`border-t border-slate-100 mx-6 ${fade("delay-400")}`}
        />
      </div>
    </div>
  );
};
