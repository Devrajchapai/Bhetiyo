import React from 'react';
import { 
  Home, 
  PlusSquare, 
  Search, 
  Users, 
  ShieldCheck, 
  MapPin, 
  Compass 
} from 'lucide-react';

export const Variant_5 = () => {
  return (
    <div className="min-h-screen bg-[#F9FAFF] flex flex-col items-center justify-center p-8 font-sans">
      
      {/* --- Illustration Section --- */}
      <div className="relative mb-12 flex justify-center items-center">
        {/* Soft Background Pulse */}
        <div className="absolute w-[400px] h-[400px] bg-orange-100/40 rounded-full blur-3xl" />
        
        {/* Main Circle Illustration */}
        <div className="relative w-64 h-64 bg-[#FFDAB9] rounded-full flex items-center justify-center">
          {/* Floating Icons */}
          <div className="absolute -top-4 -right-2 bg-white p-2 rounded-full shadow-md text-blue-500 border border-slate-50">
            <Compass size={18} />
          </div>
          <div className="absolute bottom-8 -left-6 bg-white p-2 rounded-full shadow-md text-orange-800 border border-slate-50">
            <MapPin size={18} />
          </div>
          
          {/* Minimalist Hands SVG Placeholder */}
<svg viewBox="0 0 200 200" className="w-48 h-48 opacity-60">
  <path
    d="M 50.1 82.3 C 50.1 82.3 50.1 82.3 50.1 82.3 C 50 81.3 50.2 80.3 50.8 79.5 C 51.4 78.7 52.4 78.2 53.3 78.1 L 63.8 76.4 C 64.9 76.2 65.9 76.8 66.3 77.8 C 66.7 78.8 66.5 80.1 65.7 80.8 L 50.1 82.3 Z M 149.9 82.3 C 149.9 82.3 149.9 82.3 149.9 82.3 C 150 81.3 149.8 80.3 149.2 79.5 C 148.6 78.7 147.6 78.2 146.7 78.1 L 136.2 76.4 C 135.1 76.2 134.1 76.8 133.7 77.8 C 133.3 78.8 133.5 80.1 134.3 80.8 L 149.9 82.3 Z"
    stroke="#4A5568"
    fill="none"
    strokeWidth="1.5"
    strokeLinecap="round"
  />
  <circle cx="102" cy="98" r="3" fill="white" className="animate-ping" />
</svg>
        </div>
      </div>

      {/* --- Header Content --- */}
      <div className="text-center max-w-3xl z-10">
        <h1 className="text-4xl md:text-5xl font-semibold text-[#1A202C] mb-6 leading-tight">
          Connecting people, even <br className="hidden md:block" /> when pages go missing.
        </h1>
        <p className="text-[#718096] text-lg mb-10 max-w-xl mx-auto">
          We couldn't find this specific spot, but the community is ready to help you find anything else.
        </p>
      </div>

      {/* --- Main Action Buttons --- */}
      <div className="flex flex-col sm:flex-row mb-20 w-full justify-center">
        <button 
          onClick={()=>navigation.navigate('/')}
        className="flex items-center justify-center gap-3 bg-[#2B6CB0] hover:bg-[#2C5282] text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg shadow-blue-200">
          <Home size={20} />
          Back to Safety (Home)
        </button>
        
      </div>

      {/* --- Feature Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {/* Card 1: Search */}
        <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-50 flex flex-col items-start transition-transform hover:scale-[1.02]">
          <div className="bg-[#C6F6D5] p-3 rounded-xl text-[#38A169] mb-6">
            <Search size={28} />
          </div>
          <h3 className="text-xl font-bold text-[#1A202C] mb-3">Search Items</h3>
          <p className="text-[#718096] leading-relaxed">
            Browse through recently found belongings in your area.
          </p>
        </div>

        {/* Card 2: Community */}
        <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-50 flex flex-col items-start transition-transform hover:scale-[1.02]">
          <div className="bg-[#EBF8FF] p-3 rounded-xl text-[#3182CE] mb-6">
            <Users size={28} />
          </div>
          <h3 className="text-xl font-bold text-[#1A202C] mb-3">Community</h3>
          <p className="text-[#718096] leading-relaxed">
            Connect with neighbors who might have seen your items.
          </p>
        </div>

        {/* Card 3: Secure Returns */}
        <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-50 flex flex-col items-start transition-transform hover:scale-[1.02]">
          <div className="bg-[#FEEBC8] p-3 rounded-xl text-[#DD6B20] mb-6">
            <ShieldCheck size={28} />
          </div>
          <h3 className="text-xl font-bold text-[#1A202C] mb-3">Secure Returns</h3>
          <p className="text-[#718096] leading-relaxed">
            Our verification process ensures items get back to owners.
          </p>
        </div>
      </div>

      {/* Background Decorative Blur (Bottom Right) */}
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-[#E6FFFA] rounded-full blur-[120px] -z-10 opacity-60" />
    </div>
  );
};
