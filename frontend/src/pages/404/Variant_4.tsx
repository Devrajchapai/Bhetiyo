import { useState, useEffect } from "react";
import { Home, Headphones, Search, Target } from "lucide-react";

function BottleIllustration() {
  return (
    <svg
      viewBox="0 0 280 320"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <defs>
        {/* Dark background */}
        <radialGradient id="bgBottle" cx="50%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#4b5563" />
          <stop offset="100%" stopColor="#111827" />
        </radialGradient>
        {/* Glass bottle gradient */}
        <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a5f3fc" stopOpacity="0.55" />
          <stop offset="30%" stopColor="#67e8f9" stopOpacity="0.3" />
          <stop offset="60%" stopColor="#0e7490" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#164e63" stopOpacity="0.5" />
        </linearGradient>
        {/* Glass highlight */}
        <linearGradient id="glassHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="white" stopOpacity="0.55" />
          <stop offset="40%" stopColor="white" stopOpacity="0.05" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        {/* Cork */}
        <linearGradient id="corkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#92400e" />
        </linearGradient>
        {/* Scroll */}
        <linearGradient id="scrollGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="100%" stopColor="#fde68a" />
        </linearGradient>
        {/* Water inside */}
        <linearGradient id="waterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#0369a1" stopOpacity="0.5" />
        </linearGradient>
        <filter id="bottleShadow">
          <feDropShadow
            dx="6"
            dy="10"
            stdDeviation="12"
            floodColor="#000"
            floodOpacity="0.45"
          />
        </filter>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <clipPath id="bottleClip">
          <path d="M118,68 C118,68 108,78 104,95 C100,112 98,130 98,155 L98,245 C98,262 110,275 140,275 C170,275 182,262 182,245 L182,155 C182,130 180,112 176,95 C172,78 162,68 162,68 Z" />
        </clipPath>
      </defs>

      {/* Dark background rect */}
      <rect width="280" height="320" fill="url(#bgBottle)" rx="16" />

      {/* Subtle background light */}
      <ellipse
        cx="140"
        cy="160"
        rx="90"
        ry="110"
        fill="#1e3a5f"
        opacity="0.4"
      />

      {/* === BOTTLE === */}
      <g filter="url(#bottleShadow)">
        {/* Bottle body */}
        <path
          d="M118,68 C118,68 108,78 104,95 C100,112 98,130 98,155 L98,245 C98,262 110,275 140,275 C170,275 182,262 182,245 L182,155 C182,130 180,112 176,95 C172,78 162,68 162,68 Z"
          fill="url(#glassGrad)"
          stroke="#67e8f9"
          strokeWidth="1.5"
          strokeOpacity="0.4"
        />

        {/* Water fill inside bottle */}
        <rect
          x="98"
          y="195"
          width="84"
          height="80"
          fill="url(#waterGrad)"
          clipPath="url(#bottleClip)"
        />

        {/* Water surface ripple */}
        <ellipse
          cx="140"
          cy="195"
          rx="42"
          ry="5"
          fill="#0ea5e9"
          opacity="0.3"
          clipPath="url(#bottleClip)"
        />

        {/* Glass highlight left streak */}
        <path
          d="M108,80 C106,100 105,130 106,160 C107,190 108,220 109,245"
          fill="none"
          stroke="white"
          strokeWidth="6"
          strokeOpacity="0.35"
          strokeLinecap="round"
        />
        {/* Glass highlight thin */}
        <path
          d="M116,85 C115,110 114,145 115,175"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeOpacity="0.2"
          strokeLinecap="round"
        />

        {/* Bottom reflection */}
        <ellipse cx="140" cy="265" rx="28" ry="6" fill="white" opacity="0.08" />

        {/* Bottle neck */}
        <rect
          x="122"
          y="42"
          width="36"
          height="30"
          rx="4"
          fill="#67e8f9"
          opacity="0.25"
          stroke="#a5f3fc"
          strokeWidth="1"
          strokeOpacity="0.3"
        />

        {/* Neck highlight */}
        <rect
          x="124"
          y="44"
          width="8"
          height="26"
          rx="3"
          fill="white"
          opacity="0.2"
        />
      </g>

      {/* === CORK === */}
      <g>
        <rect
          x="126"
          y="28"
          width="28"
          height="18"
          rx="4"
          fill="url(#corkGrad)"
        />
        {/* Cork grain lines */}
        <line
          x1="130"
          y1="32"
          x2="150"
          y2="32"
          stroke="#92400e"
          strokeWidth="0.8"
          opacity="0.5"
        />
        <line
          x1="129"
          y1="36"
          x2="151"
          y2="36"
          stroke="#92400e"
          strokeWidth="0.8"
          opacity="0.5"
        />
        <line
          x1="130"
          y1="40"
          x2="150"
          y2="40"
          stroke="#92400e"
          strokeWidth="0.8"
          opacity="0.5"
        />
        {/* Cork highlight */}
        <rect
          x="127"
          y="29"
          width="8"
          height="16"
          rx="2"
          fill="white"
          opacity="0.18"
        />
      </g>

      {/* === SCROLL inside bottle === */}
      <g transform="translate(115, 130) rotate(-15)">
        {/* Main scroll body */}
        <rect
          x="0"
          y="8"
          width="44"
          height="55"
          rx="3"
          fill="url(#scrollGrad)"
        />
        {/* Top curl */}
        <ellipse cx="22" cy="8" rx="22" ry="7" fill="#fde68a" />
        <ellipse cx="22" cy="8" rx="14" ry="4" fill="#fef3c7" />
        {/* Bottom curl */}
        <ellipse cx="22" cy="63" rx="22" ry="7" fill="#fde68a" />
        <ellipse cx="22" cy="63" rx="14" ry="4" fill="#fef3c7" />
        {/* Text lines on scroll */}
        <line
          x1="7"
          y1="22"
          x2="37"
          y2="22"
          stroke="#d97706"
          strokeWidth="1.2"
          opacity="0.5"
        />
        <line
          x1="7"
          y1="28"
          x2="37"
          y2="28"
          stroke="#d97706"
          strokeWidth="1.2"
          opacity="0.5"
        />
        <line
          x1="7"
          y1="34"
          x2="30"
          y2="34"
          stroke="#d97706"
          strokeWidth="1.2"
          opacity="0.5"
        />
        <line
          x1="7"
          y1="40"
          x2="37"
          y2="40"
          stroke="#d97706"
          strokeWidth="0.8"
          opacity="0.4"
        />
        <line
          x1="7"
          y1="46"
          x2="28"
          y2="46"
          stroke="#d97706"
          strokeWidth="0.8"
          opacity="0.4"
        />
        {/* Red ribbon */}
        <line
          x1="20"
          y1="4"
          x2="20"
          y2="68"
          stroke="#ef4444"
          strokeWidth="2.5"
          opacity="0.8"
        />
        <line
          x1="24"
          y1="4"
          x2="24"
          y2="68"
          stroke="#dc2626"
          strokeWidth="1.5"
          opacity="0.6"
        />
        {/* Ribbon bow knot */}
        <ellipse cx="22" cy="36" rx="6" ry="4" fill="#ef4444" opacity="0.9" />
        <circle cx="22" cy="36" r="2" fill="#fca5a5" opacity="0.8" />
      </g>

      {/* Ice chunks */}
      <g opacity="0.5">
        <polygon
          points="103,230 112,218 118,228 109,240"
          fill="#e0f2fe"
          opacity="0.4"
        />
        <polygon
          points="158,240 168,225 176,235 165,248"
          fill="#e0f2fe"
          opacity="0.35"
        />
        <polygon
          points="100,250 108,242 114,250 106,258"
          fill="#bae6fd"
          opacity="0.3"
        />
      </g>
    </svg>
  );
}

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
        <div
          className={`relative flex-shrink-0 w-full max-w-[300px] transition-all duration-700 ${
            mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          }`}
        >
          {/* Search icon badge */}
          <div className="absolute -top-3 -right-3 z-10 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center">
            <Search className="w-4 h-4 text-slate-400" strokeWidth={2} />
          </div>

          {/* Floating target badge */}
          <div className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center">
            <Target className="w-4 h-4 text-emerald-400" strokeWidth={2} />
          </div>

          <div className="rounded-3xl overflow-hidden shadow-2xl w-full aspect-[7/8]">
            <BottleIllustration />
          </div>
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
