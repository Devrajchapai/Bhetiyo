
import { Home, LayoutGrid, Search, ShieldCheck, Wifi, Gem } from 'lucide-react';

export const Variant_6 = () => {
  return (
    <div className="min-h-screen bg-[#F0F4F8] relative flex flex-col items-center justify-center p-6 overflow-hidden font-sans text-[#1A202C]">
      
      {/* Background Decorative Elements (Subtle Waves/Mist) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,1)_0%,_rgba(235,242,250,0.5)_100%)] opacity-70" />
      <div className="absolute top-1/4 left-0 w-full h-1 bg-white/20 blur-2xl" />

      {/* --- Top Floating Card: Trusted Network --- */}
      <div className="absolute top-24 right-[10%] md:right-[15%] bg-white/80 backdrop-blur-md p-5 rounded-2xl shadow-xl shadow-blue-900/5 border border-white rotate-2 max-w-[240px] z-20">
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-emerald-100 p-1 rounded-full text-emerald-500">
            <ShieldCheck size={16} strokeWidth={3} />
          </div>
          <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">Trusted Network</span>
        </div>
        <p className="text-sm text-slate-600 leading-snug">
          1,240 signals verified today across the coast.
        </p>
      </div>

      {/* --- Center Lighthouse Illustration --- */}
      <div className="relative mb-8">
        {/* Main Frosted Circle */}
        <div className="w-80 h-80 bg-white/40 backdrop-blur-sm rounded-full border border-white/50 shadow-2xl flex items-center justify-center relative">
          
          {/* Signal Icon (Lighthouse Lens) */}
          <div className="relative w-24 h-24 flex items-center justify-center">
            {/* Rays */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <div
                key={deg}
                className="absolute w-2.5 h-6 bg-[#1D5DB1] rounded-full"
                style={{
                  transform: `rotate(${deg}deg) translateY(-38px)`,
                }}
              />
            ))}
            {/* Center Circle */}
            <div className="w-16 h-16 bg-[#1D5DB1] rounded-full shadow-lg shadow-blue-500/20" />
          </div>

          {/* Top Right Floating Icon */}
          <div className="absolute -top-4 -right-2 bg-white p-2 rounded-xl shadow-lg border border-slate-50 text-blue-800">
            <Wifi size={24} />
          </div>
        </div>

        
      </div>

      {/* --- Text Content --- */}
      <div className="text-center z-10">
        <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-6 inline-block border border-emerald-200/50">
          404 Error
        </span>
        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-800 mb-6 tracking-tight">
          Looking for a signal?
        </h1>
        <p className="text-slate-500 text-lg max-w-lg mx-auto leading-relaxed mb-10">
          This page might be out at sea, but our community is always <br /> here to guide you home.
        </p>
      </div>

      {/* --- Primary Buttons --- */}
      <div className="flex flex-col sm:flex-row gap-4 mb-20 z-10">
        <button 
        onClick={()=>navigation.navigate('/')}
        className="flex items-center justify-center gap-2 bg-[#2B6CB0] hover:bg-[#23578F] text-white px-8 py-4 rounded-xl font-bold transition-all shadow-xl shadow-blue-500/20">
          <Home size={20} />
          Return to Harbor (Home)
        </button>
        
      </div>

      {/* --- Bottom Floating Card: Recent Recovery --- */}
      <div className="absolute bottom-12 left-10 md:left-20 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-2xl shadow-slate-900/10 border border-white -rotate-3 max-w-[260px] z-20">
        <div className="flex items-center gap-2 mb-3">
          <div className="bg-orange-100 p-1.5 rounded-lg text-orange-600">
            <Gem size={18} />
          </div>
          <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">Recent Recovery</span>
        </div>
        <p className="text-[#1A202C] font-semibold leading-relaxed">
          "Found my keys thanks to Bhetiyo community!"
        </p>
      </div>
    </div>
  );
};
