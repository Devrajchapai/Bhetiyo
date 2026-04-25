import { useState, useEffect } from "react";
import { Home, Flag, MapPin, HelpCircle } from "lucide-react";

const ShowMap = () => {
  return (
    <svg
      viewBox="0 0 340 288"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <defs>
        {/* Water / park gradient fills */}
        <linearGradient id="waterGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#bae6fd" />
          <stop offset="100%" stopColor="#7dd3fc" />
        </linearGradient>
        <linearGradient id="parkGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#bbf7d0" />
          <stop offset="100%" stopColor="#86efac" />
        </linearGradient>
        <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f0f9ff" />
          <stop offset="100%" stopColor="#e0f2fe" />
        </linearGradient>
        {/* Subtle drop shadow for pin */}
        <filter id="pinShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow
            dx="0"
            dy="3"
            stdDeviation="4"
            floodColor="#1d4ed8"
            floodOpacity="0.35"
          />
        </filter>
        <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow
            dx="0"
            dy="2"
            stdDeviation="3"
            floodColor="#0f172a"
            floodOpacity="0.12"
          />
        </filter>
      </defs>

      {/* ── Base land ── */}
      <rect width="340" height="288" fill="url(#bgGrad)" />

      {/* ── City blocks (light beige) ── */}
      {/* Top-left district */}
      <rect
        x="10"
        y="10"
        width="55"
        height="38"
        rx="2"
        fill="#fef3c7"
        opacity="0.8"
      />
      <rect
        x="10"
        y="54"
        width="55"
        height="30"
        rx="2"
        fill="#fef9ee"
        opacity="0.8"
      />
      <rect
        x="72"
        y="10"
        width="40"
        height="38"
        rx="2"
        fill="#fef3c7"
        opacity="0.7"
      />
      <rect
        x="72"
        y="54"
        width="40"
        height="30"
        rx="2"
        fill="#fef9ee"
        opacity="0.7"
      />

      {/* Top-right district */}
      <rect
        x="200"
        y="10"
        width="60"
        height="35"
        rx="2"
        fill="#fef3c7"
        opacity="0.8"
      />
      <rect
        x="268"
        y="10"
        width="62"
        height="35"
        rx="2"
        fill="#fef9ee"
        opacity="0.8"
      />
      <rect
        x="200"
        y="52"
        width="60"
        height="28"
        rx="2"
        fill="#fef3c7"
        opacity="0.7"
      />
      <rect
        x="268"
        y="52"
        width="62"
        height="28"
        rx="2"
        fill="#fef9ee"
        opacity="0.7"
      />

      {/* Mid-left blocks */}
      <rect
        x="10"
        y="110"
        width="48"
        height="42"
        rx="2"
        fill="#fef3c7"
        opacity="0.75"
      />
      <rect
        x="64"
        y="110"
        width="44"
        height="42"
        rx="2"
        fill="#fef9ee"
        opacity="0.75"
      />
      <rect
        x="10"
        y="158"
        width="48"
        height="36"
        rx="2"
        fill="#fef3c7"
        opacity="0.75"
      />
      <rect
        x="64"
        y="158"
        width="44"
        height="36"
        rx="2"
        fill="#fef9ee"
        opacity="0.7"
      />

      {/* Mid-right blocks */}
      <rect
        x="228"
        y="110"
        width="50"
        height="42"
        rx="2"
        fill="#fef3c7"
        opacity="0.75"
      />
      <rect
        x="284"
        y="110"
        width="46"
        height="42"
        rx="2"
        fill="#fef9ee"
        opacity="0.75"
      />
      <rect
        x="228"
        y="158"
        width="50"
        height="36"
        rx="2"
        fill="#fef3c7"
        opacity="0.75"
      />
      <rect
        x="284"
        y="158"
        width="46"
        height="36"
        rx="2"
        fill="#fef9ee"
        opacity="0.7"
      />

      {/* Bottom blocks */}
      <rect
        x="10"
        y="220"
        width="55"
        height="58"
        rx="2"
        fill="#fef3c7"
        opacity="0.8"
      />
      <rect
        x="72"
        y="220"
        width="40"
        height="58"
        rx="2"
        fill="#fef9ee"
        opacity="0.75"
      />
      <rect
        x="200"
        y="220"
        width="60"
        height="58"
        rx="2"
        fill="#fef3c7"
        opacity="0.8"
      />
      <rect
        x="268"
        y="220"
        width="62"
        height="58"
        rx="2"
        fill="#fef9ee"
        opacity="0.75"
      />

      {/* ── Park / green areas ── */}
      <ellipse
        cx="170"
        cy="144"
        rx="52"
        ry="42"
        fill="url(#parkGrad)"
        opacity="0.55"
      />
      <ellipse
        cx="170"
        cy="144"
        rx="38"
        ry="28"
        fill="#86efac"
        opacity="0.35"
      />
      {/* Park trees (dots) */}
      {[
        [148, 128],
        [162, 122],
        [178, 126],
        [190, 135],
        [185, 150],
        [172, 158],
        [155, 155],
        [143, 147],
        [145, 135],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="4" fill="#4ade80" opacity="0.6" />
      ))}

      {/* ── Water body (river running diagonally) ── */}
      <path
        d="M0 200 Q40 185 80 195 Q120 205 140 190 Q160 175 180 178 Q210 182 240 170 Q270 158 300 165 Q320 170 340 162 L340 180 Q310 190 280 183 Q248 176 218 188 Q190 200 162 196 Q138 192 115 205 Q85 218 50 210 Q25 204 0 218Z"
        fill="url(#waterGrad)"
        opacity="0.7"
      />

      {/* ── Major roads (thicker, cream/white) ── */}
      {/* Horizontal main road */}
      <line x1="0" y1="92" x2="340" y2="92" stroke="#fff" strokeWidth="7" />
      <line x1="0" y1="92" x2="340" y2="92" stroke="#e2e8f0" strokeWidth="5" />
      {/* Horizontal lower main road */}
      <line x1="0" y1="200" x2="340" y2="200" stroke="#fff" strokeWidth="7" />
      <line
        x1="0"
        y1="200"
        x2="340"
        y2="200"
        stroke="#e2e8f0"
        strokeWidth="5"
      />
      {/* Vertical main road */}
      <line x1="120" y1="0" x2="120" y2="288" stroke="#fff" strokeWidth="7" />
      <line
        x1="120"
        y1="0"
        x2="120"
        y2="288"
        stroke="#e2e8f0"
        strokeWidth="5"
      />
      {/* Vertical right main road */}
      <line x1="222" y1="0" x2="222" y2="288" stroke="#fff" strokeWidth="7" />
      <line
        x1="222"
        y1="0"
        x2="222"
        y2="288"
        stroke="#e2e8f0"
        strokeWidth="5"
      />

      {/* ── Secondary roads ── */}
      <line
        x1="0"
        y1="50"
        x2="340"
        y2="50"
        stroke="#fff"
        strokeWidth="3.5"
        opacity="0.9"
      />
      <line
        x1="0"
        y1="50"
        x2="340"
        y2="50"
        stroke="#cbd5e1"
        strokeWidth="2.5"
        opacity="0.8"
      />

      <line
        x1="0"
        y1="155"
        x2="340"
        y2="155"
        stroke="#fff"
        strokeWidth="3.5"
        opacity="0.9"
      />
      <line
        x1="0"
        y1="155"
        x2="340"
        y2="155"
        stroke="#cbd5e1"
        strokeWidth="2.5"
        opacity="0.8"
      />

      <line
        x1="0"
        y1="248"
        x2="340"
        y2="248"
        stroke="#fff"
        strokeWidth="3.5"
        opacity="0.9"
      />
      <line
        x1="0"
        y1="248"
        x2="340"
        y2="248"
        stroke="#cbd5e1"
        strokeWidth="2.5"
        opacity="0.8"
      />

      <line
        x1="68"
        y1="0"
        x2="68"
        y2="288"
        stroke="#fff"
        strokeWidth="3.5"
        opacity="0.9"
      />
      <line
        x1="68"
        y1="0"
        x2="68"
        y2="288"
        stroke="#cbd5e1"
        strokeWidth="2.5"
        opacity="0.8"
      />

      <line
        x1="172"
        y1="0"
        x2="172"
        y2="288"
        stroke="#fff"
        strokeWidth="3.5"
        opacity="0.9"
      />
      <line
        x1="172"
        y1="0"
        x2="172"
        y2="288"
        stroke="#cbd5e1"
        strokeWidth="2.5"
        opacity="0.8"
      />

      <line
        x1="278"
        y1="0"
        x2="278"
        y2="288"
        stroke="#fff"
        strokeWidth="3.5"
        opacity="0.9"
      />
      <line
        x1="278"
        y1="0"
        x2="278"
        y2="288"
        stroke="#cbd5e1"
        strokeWidth="2.5"
        opacity="0.8"
      />

      {/* ── Diagonal road ── */}
      <line
        x1="0"
        y1="288"
        x2="200"
        y2="0"
        stroke="#fff"
        strokeWidth="4"
        opacity="0.7"
      />
      <line
        x1="0"
        y1="288"
        x2="200"
        y2="0"
        stroke="#cbd5e1"
        strokeWidth="2.5"
        opacity="0.6"
      />

      {/* ── Road dashes (center lines) ── */}
      {[
        0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280,
        300, 320,
      ].map((x, i) => (
        <rect
          key={i}
          x={x}
          y="91"
          width="10"
          height="2"
          fill="#94a3b8"
          opacity="0.5"
        />
      ))}
      {[
        0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280,
        300, 320,
      ].map((x, i) => (
        <rect
          key={i}
          x={x}
          y="199"
          width="10"
          height="2"
          fill="#94a3b8"
          opacity="0.5"
        />
      ))}

      {/* ── Building footprints (darker blocks inside city blocks) ── */}
      <rect
        x="16"
        y="16"
        width="22"
        height="14"
        rx="1"
        fill="#fbbf24"
        opacity="0.4"
      />
      <rect
        x="42"
        y="16"
        width="18"
        height="14"
        rx="1"
        fill="#fbbf24"
        opacity="0.3"
      />
      <rect
        x="16"
        y="58"
        width="22"
        height="12"
        rx="1"
        fill="#fbbf24"
        opacity="0.35"
      />
      <rect
        x="42"
        y="58"
        width="18"
        height="12"
        rx="1"
        fill="#fbbf24"
        opacity="0.3"
      />
      <rect
        x="206"
        y="16"
        width="24"
        height="14"
        rx="1"
        fill="#fbbf24"
        opacity="0.4"
      />
      <rect
        x="236"
        y="16"
        width="18"
        height="14"
        rx="1"
        fill="#fbbf24"
        opacity="0.3"
      />
      <rect
        x="274"
        y="16"
        width="22"
        height="14"
        rx="1"
        fill="#fbbf24"
        opacity="0.35"
      />
      <rect
        x="300"
        y="16"
        width="20"
        height="14"
        rx="1"
        fill="#fbbf24"
        opacity="0.3"
      />
      <rect
        x="234"
        y="116"
        width="20"
        height="14"
        rx="1"
        fill="#fbbf24"
        opacity="0.35"
      />
      <rect
        x="258"
        y="116"
        width="16"
        height="14"
        rx="1"
        fill="#fbbf24"
        opacity="0.3"
      />
      <rect
        x="290"
        y="116"
        width="18"
        height="14"
        rx="1"
        fill="#fbbf24"
        opacity="0.3"
      />
      <rect
        x="16"
        y="226"
        width="22"
        height="16"
        rx="1"
        fill="#fbbf24"
        opacity="0.35"
      />
      <rect
        x="42"
        y="226"
        width="18"
        height="16"
        rx="1"
        fill="#fbbf24"
        opacity="0.3"
      />
      <rect
        x="206"
        y="226"
        width="24"
        height="16"
        rx="1"
        fill="#fbbf24"
        opacity="0.35"
      />
      <rect
        x="274"
        y="226"
        width="22"
        height="16"
        rx="1"
        fill="#fbbf24"
        opacity="0.3"
      />

      {/* ── Roundabout at center intersection ── */}
      <circle
        cx="171"
        cy="92"
        r="10"
        fill="#e2e8f0"
        stroke="#fff"
        strokeWidth="2"
      />
      <circle cx="171" cy="92" r="5" fill="#cbd5e1" />

      {/* ── Location Pin ── */}
      <g filter="url(#pinShadow)">
        {/* Pin body */}
        <path
          d="M171 60 C158 60 148 70 148 83 C148 100 171 120 171 120 C171 120 194 100 194 83 C194 70 184 60 171 60Z"
          fill="#1d4ed8"
        />
        {/* Pin inner circle */}
        <circle cx="171" cy="83" r="9" fill="white" opacity="0.95" />
        {/* Question mark */}
        <text
          x="171"
          y="88"
          textAnchor="middle"
          fontSize="12"
          fontWeight="bold"
          fill="#1d4ed8"
        >
          ?
        </text>
      </g>

      {/* ── Map compass (top-right corner) ── */}
      <g transform="translate(306, 22)">
        <circle r="12" fill="white" opacity="0.85" />
        <text
          textAnchor="middle"
          y="-4"
          fontSize="7"
          fontWeight="bold"
          fill="#64748b"
        >
          N
        </text>
        <text textAnchor="middle" y="10" fontSize="7" fill="#94a3b8">
          S
        </text>
        <text x="6" y="3" fontSize="7" fill="#94a3b8">
          E
        </text>
        <text x="-9" y="3" fontSize="7" fill="#94a3b8">
          W
        </text>
        <line x1="0" y1="-8" x2="0" y2="8" stroke="#cbd5e1" strokeWidth="0.8" />
        <line x1="-8" y1="0" x2="8" y2="0" stroke="#cbd5e1" strokeWidth="0.8" />
      </g>

      {/* ── Scale bar ── */}
      <g transform="translate(14, 268)">
        <rect width="60" height="4" rx="2" fill="#94a3b8" opacity="0.5" />
        <rect width="30" height="4" rx="2" fill="#64748b" opacity="0.6" />
        <text y="14" fontSize="7" fill="#64748b" opacity="0.8">
          0 250m
        </text>
      </g>

      {/* ── Subtle vignette overlay ── */}
      <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
        <stop offset="60%" stopColor="transparent" />
        <stop offset="100%" stopColor="#0f172a" stopOpacity="0.08" />
      </radialGradient>
      <rect width="340" height="288" fill="url(#vignette)" />
    </svg>
  );
};

export const Variant_1 = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fade = (delay = "") =>
    `transition-all duration-700 ${delay} ${
      mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
    }`;

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-6">
      <div className="flex flex-col md:flex-row items-center gap-10 max-w-4xl w-full">
        {/* LEFT — Map Card */}
        <div
          className={`relative w-full max-w-sm rounded-3xl overflow-hidden shadow-lg bg-white flex-shrink-0 transition-all duration-700 ${
            mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          }`}
        >
          {/* Map illustration */}
          {ShowMap()}

          {/* Status bar */}
          <div className="flex items-center gap-3 px-5 py-4 bg-white">
            <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-4 h-4 text-emerald-500" strokeWidth={2} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-700">
                Searching for path...
              </p>
              <p className="text-xs text-slate-400">404: Location Not Found</p>
            </div>
          </div>
        </div>

        {/* RIGHT — Content */}
        <div className="flex flex-col gap-5 w-full">
          {/* Badge */}
          <div className={fade("delay-100")}>
            <span className="text-xs font-semibold tracking-widest bg-[#195D81]/10 text-[#195D81] border border-slate-300 rounded-full px-3 py-1 uppercase">
              Error 404
            </span>
          </div>

          {/* Heading */}
          <div className={fade("delay-150")}>
            <h1 className="text-4xl font-bold text-slate-800 leading-tight">
              You've wandered off
              <div className="text-blue-600">the trail.</div>
            </h1>
          </div>

          {/* Description */}
          <p
            className={`text-slate-500 text-base leading-relaxed max-w-md ${fade("delay-200")}`}
          >
            Don't worry, even the best explorers get lost sometimes. Let's get
            you back to the community and find what you're looking for.
          </p>

          {/* CTA Buttons */}
          <div className={`flex flex-wrap gap-3 ${fade("delay-300")}`}>
            <button
              onClick={() => {
                navigation.navigate("/");
              }}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold px-6 py-3 rounded-full shadow-md transition-all duration-200"
            >
              <Home className="w-4 h-4" strokeWidth={2} />
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
