import { Footer } from "@/components/Footer";
import { NavigationBar } from "@/components/NavigationBar";
import { SignUp } from "@/components/Signup";
import { Button } from "@/components/ui/button";
import {
  BadgeCheck,
  CirclePlus,
  HandHeart,
  MapPin,
  Search,
  Trophy,
} from "lucide-react";
import { useEffect } from "react";

const recentItems = [
  {
    id: 1,
    type: "FOUND",
    category: "Electronics",
    title: "Bose QuietComfort 45",
    location: "Central Park, NYC",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80",
    buttonText: "That's mine!",
  },
  {
    id: 2,
    type: "FOUND",
    category: "Personal",
    title: "Leather Bi-fold Wallet",
    location: "Grand Central Terminal",
    image:
      "https://images.unsplash.com/photo-1627123430985-71d464a0b89a?auto=format&fit=crop&q=80",
    buttonText: "That's mine!",
  },
  {
    id: 3,
    type: "LOST",
    category: "Apparel",
    title: "Red Nike Air Max",
    location: "Riverside Drive",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80",
    buttonText: "Found this?",
  },
  {
    id: 4,
    type: "FOUND",
    category: "Electronics",
    title: "Vintage Leica M6",
    location: "Botanical Gardens",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80",
    buttonText: "That's mine!",
  },
  {
    id: 5,
    type: "FOUND",
    category: "Electronics",
    title: "Bose QuietComfort 45",
    location: "Central Park, NYC",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80",
    buttonText: "That's mine!",
  },
  {
    id: 6,
    type: "FOUND",
    category: "Personal",
    title: "Leather Bi-fold Wallet",
    location: "Grand Central Terminal",
    image:
      "https://images.unsplash.com/photo-1627123430985-71d464a0b89a?auto=format&fit=crop&q=80",
    buttonText: "That's mine!",
  },
  {
    id: 7,
    type: "LOST",
    category: "Apparel",
    title: "Red Nike Air Max",
    location: "Riverside Drive",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80",
    buttonText: "Found this?",
  },
  {
    id: 8,
    type: "FOUND",
    category: "Electronics",
    title: "Vintage Leica M6",
    location: "Botanical Gardens",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80",
    buttonText: "That's mine!",
  },
];

const topContributors = [
  {
    name: "David Chen",
    role: "Gold Contributor",
    lost: 12,
    found: 45,
    points: "2,450",
    avatar: "https://api.dicebear.com/8.x/notionists/svg?seed=david",
  },
  {
    name: "Sarah Jenkins",
    role: "Silver Contributor",
    lost: 5,
    found: 38,
    points: "1,920",
    avatar: "https://api.dicebear.com/8.x/notionists/svg?seed=sarah",
  },
  {
    name: "Marcus Thorne",
    role: "Silver Contributor",
    lost: 8,
    found: 31,
    points: "1,580",
    avatar: "https://api.dicebear.com/8.x/notionists/svg?seed=marcus",
  },
  {
    name: "David Chen",
    role: "Gold Contributor",
    lost: 12,
    found: 45,
    points: "2,450",
    avatar: "https://api.dicebear.com/8.x/notionists/svg?seed=david",
  },
  {
    name: "Sarah Jenkins",
    role: "Silver Contributor",
    lost: 5,
    found: 38,
    points: "1,920",
    avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=sarah",
  },
  {
    name: "Marcus Thorne",
    role: "Silver Contributor",
    lost: 8,
    found: 31,
    points: "1,580",
    avatar: "https://api.dicebear.com/8.x/notionists/svg?seed=marcus",
  },
  {
    name: "David Chen",
    role: "Gold Contributor",
    lost: 12,
    found: 45,
    points: "2,450",
    avatar: "https://api.dicebear.com/8.x/notionists/svg?seed=david",
  },
  {
    name: "Sarah Jenkins",
    role: "Silver Contributor",
    lost: 5,
    found: 38,
    points: "1,920",
    avatar: "https://api.dicebear.com/8.x/notionists/svg?seed=sarah",
  },
  {
    name: "Marcus Thorne",
    role: "Silver Contributor",
    lost: 8,
    found: 31,
    points: "1,580",
    avatar: "https://api.dicebear.com/8.x/notionists/svg?seed=marcus",
  },
];

const metrics = [
  { value: "12k+", label: "Returned", icon: "Target", color: "text-blue-600" },
  { value: "85%", label: "Success", icon: "Zap", color: "text-emerald-600" },
  { value: "24h", label: "Avg. Time", icon: "Clock", color: "text-slate-600" },
  { value: "50k", label: "Active", icon: "Users", color: "text-orange-500" },
];

export const Home = () => {
  useEffect(() => {
    document.title = "Bhetiyo";
  }, []);
  return (
    <div>
      {/* all the logic are defined inside of the SignUp.tsx file  */}
      <NavigationBar />
      <SignUp />

      {/* Home contains  */}
      <div className="mx-6 md:mx-10 mt-14 mb-20">
        {/* Introduction section */}
        <div className="flex flex-col lg:flex-row gap-12  items-center">
          {/* Left Side: Content */}
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 lg:flex-end rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-100">
              <BadgeCheck size={14} />
              1,240 Items Reunited This Week
            </div>

            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1]">
              Restoring peace, one <br />
              <span className="text-blue-600 font-extrabold">found</span>{" "}
              treasure at a time.
            </h1>

            <p className="text-slate-500 text-lg leading-relaxed max-w-md">
              Bhetiyo uses high-trust community verification and advanced
              mapping to help you recover what you've lost or return what you've
              found.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                size="lg"
                className="rounded-full px-8 gap-2 bg-[#2b6cb0] hover:bg-blue-800 shadow-xl shadow-blue-100"
              >
                <Search size={18} />
                Search for Lost Item
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 gap-2 border-slate-200 text-slate-700 hover:bg-slate-50"
              >
                <CirclePlus size={18} />
                Report Found Item
              </Button>
            </div>
          </div>

          {/* Right Side: Image Grid Layout */}
          <div className="flex-1 w-full lg:w-auto">
            <div className="flex flex-row gap-4 items-start justify-center lg:justify-start">
              {/* Main Image with Floating Card */}
              <div className="relative rounded-[40px] overflow-hidden w-[300px] lg:w-[360px] h-[500px] shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80"
                  className="w-full h-full object-cover"
                  alt="Lost Tote"
                />
                {/* Floating Info Card */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[85%] bg-white/80 backdrop-blur-md p-5 rounded-3xl shadow-lg border border-white/20">
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
                    Lost Item
                  </span>
                  <div className="flex justify-between items-center mt-1">
                    <h3 className="font-bold text-slate-800 text-lg">
                      Vintage Leather Tote
                    </h3>
                    <span className="bg-[#e9dcc9] text-[#8b5e34] text-[10px] font-bold px-2 py-1 rounded-full">
                      HIGH BOUNTY
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column Grid */}
              <div className="flex flex-col gap-4">
                {/* Small Top Image */}
                <div className="rounded-[40px] overflow-hidden w-[220px] lg:w-[260px] h-[260px] shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&q=80"
                    className="w-full h-full object-cover"
                    alt="Found Phone"
                  />
                </div>

                {/* Guardians Stats Card */}
                <div className="flex flex-col justify-center items-center h-[220px] w-[220px] lg:w-[260px] rounded-[40px] bg-white border border-slate-100 shadow-xl p-6">
                  <div className="p-4 bg-blue-50 rounded-full mb-4">
                    <HandHeart size={32} className="text-blue-600" />
                  </div>
                  <span className="text-3xl font-extrabold text-slate-900">
                    20k+
                  </span>
                  <span className="text-slate-500 text-sm font-medium">
                    Active Guardians
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* card  */}
      <section className="mx-10 p-5 mb-24 border rounded-4xl bg-[#F4F7FF]">
        {/* Header Area */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900">
            Recent Discoveries
          </h2>
          <p className="text-slate-500 mt-1">
            The latest items reported in community.
          </p>
        </div>

        {/* X-Axis Scrollable Container */}
        <div className="flex overflow-x-auto pb-8 gap-6 snap-x snap-mandatory no-scrollbar">
          {recentItems.map((item) => (
            <div
              key={item.id}
              className="snap-start flex-shrink-0 w-[280px] md:w-[320px] group bg-white rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Badge Overlay */}
                <div className="absolute top-4 left-4">
                  <span
                    className={`text-[10px] font-bold px-3 py-1 rounded-full text-white tracking-wider ${
                      item.type === "FOUND"
                        ? "bg-emerald-500/90"
                        : "bg-orange-500/90"
                    }`}
                  >
                    {item.type}
                  </span>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-5 space-y-3">
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                  {item.category}
                </span>
                <h3 className="font-bold text-slate-800 text-lg leading-tight line-clamp-1">
                  {item.title}
                </h3>

                <div className="flex items-center gap-1.5 text-slate-400 text-sm">
                  <MapPin size={14} className="flex-shrink-0" />
                  <span className="truncate">{item.location}</span>
                </div>

                <Button
                  variant="outline"
                  className="w-full rounded-2xl border-blue-100 text-blue-600 font-bold hover:bg-blue-50 hover:text-blue-700 transition-colors py-5"
                >
                  {item.buttonText}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Leading Board  */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side: Impact & Simplified Metrics */}
          <div className="space-y-12 ">
            <div className="space-y-4 ">
              <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
                Community Impact
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed max-w-md">
                Our community is powered by heroes who go the extra mile. These
                individuals have helped reunite hundreds of items with their
                owners this month.
              </p>
            </div>

            {/* Simplified Matrix Style */}
            <div className="grid grid-cols-2 gap-8 border-t border-slate-100 pt-10">
              {metrics.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-slate-400 mb-1 max-lg:justify-center">
                      <Icon size={16} />
                      <span className="text-[11px] font-bold uppercase tracking-wider ">
                        {stat.label}
                      </span>
                    </div>
                    <span
                      className={`text-3xl font-mono max-lg:flex max-lg:justify-center ${stat.color}`}
                    >
                      {stat.value}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side: Hero Board (Leaderboard) */}
          <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm p-8 md:p-10">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-orange-50 text-orange-600 rounded-xl">
                  <Trophy size={20} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Top Contributors
                </h3>
              </div>
              <span className="text-xs font-medium text-slate-400 bg-slate-50 px-3 py-1 rounded-full">
                This Month
              </span>
            </div>

            <div className="space-y-6 h-70 overflow-y-auto no-scrollbar">
              {topContributors.map((hero, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={hero.avatar}
                        className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100"
                        alt=""
                      />
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm text-[10px] font-bold border border-slate-50">
                        {index + 1}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{hero.name}</h4>
                      <p className="text-xs text-slate-500 font-medium">
                        {hero.role}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-extrabold text-blue-600">
                      {hero.points} pts
                    </p>
                    <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-tighter">
                      {hero.found} Finds
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
