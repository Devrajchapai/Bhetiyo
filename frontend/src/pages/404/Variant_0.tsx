import { CircleQuestionMark, Home, Map, Search } from "lucide-react";
import { useState, useEffect } from "react";

export const Variant_0 = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden bg-linear-to-br from-slate-50 via-blue-50 to-orange-50">
      {/* Soft background blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-100 rounded-full opacity-40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-orange-100 rounded-full opacity-40 blur-3xl pointer-events-none" />

      {/* 404 Illustration */}
      <div
        className={`flex items-center justify-center mb-8 transition-all duration-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
        }`}
      >
        <span className="text-[7rem] font-black text-slate-200 leading-none select-none tracking-tighter">
          4
        </span>

        {/* Magnifying Glass */}
        <div className="relative mx-2 w-28 h-28 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full border-[5px] border-blue-500 bg-white shadow-lg flex items-center justify-center">
            <div className="w-5 h-5 rounded-full bg-emerald-400 opacity-80" />
          </div>
          {/* Handle */}
          <div className="absolute bottom-1 right-1 w-8 h-2 bg-slate-400 rounded-full rotate-45 origin-left" />
        </div>

        <span className="text-[7rem] font-black text-slate-200 leading-none select-none tracking-tighter">
          4
        </span>
      </div>

      {/* Heading */}
      <div
        className={`text-center mb-3 transition-all duration-700 delay-100 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 leading-tight">
          Even the best finders get lost
          <br />
          sometimes.
        </h1>
      </div>

      {/* Subtext */}
      <p
        className={`text-[#727783] text-sm sm:text-base text-center max-w-sm mb-8 transition-all duration-700 delay-150 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        We couldn't find the page you were looking for, but let's get you back
        on the right path.
      </p>

      {/* CTA Buttons */}
      <div
        className={`flex flex-wrap gap-3 justify-center mb-16 transition-all duration-700 delay-200 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <button
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold px-6 py-3 rounded-full shadow-md transition-all duration-200"
          onClick={() => {
            navigation.navigate("/");
          }}
        >
          <Home size={16} />
          Back to Home
        </button>
      </div>

      {/* Info Cards */}
      <div
        className={`grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl transition-all duration-700 delay-300 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {/* Lost Items */}
        <div className="bg-white/70 backdrop-blur-sm border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-3 text-[#195DB1]">
            <Map size={18} />
          </div>
          <h3 className="font-bold text-slate-800 mb-1">Lost Items</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            Browse through reported items to find what's yours.
          </p>
        </div>

        {/* How it Works */}
        <div className="bg-white/70 backdrop-blur-sm border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mb-3 text-[#006D41]">
            <Search size={18} />
          </div>
          <h3 className="font-bold text-slate-800 mb-1">How it Works</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            Learn how Bhetiyo helps reunite items with their owners.
          </p>
        </div>

        {/* Contact Support */}
        <div className="bg-white/70 backdrop-blur-sm border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200">
          <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center mb-3 text-[#D07D30]">
            <CircleQuestionMark size={18} />
          </div>
          <h3 className="font-bold text-slate-800 mb-1">Contact Support</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            Need manual assistance? Our team is here to help.
          </p>
        </div>
      </div>
    </div>
  );
};
