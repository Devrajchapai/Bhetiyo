import { useEffect } from "react";
import { useNavigationBar } from "@/store/ui/navigationbar";
import { useAuth } from "@/store/data/auth";
import { api } from "@/api";
import { useQuery } from "@tanstack/react-query";
import {
  HandHeart,
  BadgeCheck,
  Users,
  RotateCcw,
  TrendingUp,
  Shield,
  MapPin,
  Gift,
  ArrowRight,
  Loader2,
  Calendar,
  MessageCircleHeart,
  Heart,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

const ICON_MAP = { RotateCcw, Users, HandHeart, TrendingUp };

const fetchCommunity = async () => {
  const { data } = await api.get("/community");
  return data.data;
};

const STORIES = [
  {
    title: "Vintage Camera Found",
    description: "A family heirloom camera lost during a trek in Pokhara was returned within 24 hours thanks to a quick-thinking hiker.",
    location: "Pokhara",
    emoji: "📸",
    by: "Rajesh",
  },
  {
    title: "Wallet with 3 Days of Memories",
    description: "A tourist's wallet containing cash, cards, and a SD card full of vacation photos was returned intact by a local shopkeeper.",
    location: "Lakeside",
    emoji: "👛",
    by: "Anita",
  },
  {
    title: "Lost Dog Reunited",
    description: "A beloved family dog that wandered off was spotted by a community member who recognized it from a Bhetiyo post.",
    location: "Kathmandu",
    emoji: "🐕",
    by: "Prakash",
  },
  {
    title: "Textbooks Returned to Student",
    description: "A bag of textbooks left at a bus stop was returned to a medical student just before finals — a stranger drove 30 minutes to deliver them.",
    location: "Chitwan",
    emoji: "📚",
    by: "Sneha",
  },
];

const STATS = [
  { icon: "RotateCcw", value: "1,240+", label: "Reunited" },
  { icon: "Users", value: "3,500+", label: "Members" },
  { icon: "HandHeart", value: "98%", label: "Return Rate" },
  { icon: "TrendingUp", value: "320+", label: "This Month" },
];

export const Community = () => {
  const changeTab = useNavigationBar((state) => state.changeTab);
  const isConnected = useAuth((state) => state.isConnected);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["community"],
    queryFn: fetchCommunity,
    retry: 1,
    staleTime: 60000,
  });

  useEffect(() => {
    changeTab("community");
  }, []);

  const stats = data?.stats ?? STATS;
  const stories = data?.successStories ?? STORIES;
  const reunited = stats.find((s) => s.label === "Reunited" || s.label === "Items Reunited");

  return (
    <div className="min-h-screen bg-white">
      <div className="relative bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />
        <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-28">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-indigo-200 text-xs font-medium mb-5 border border-white/10">
                <Sparkles className="w-3.5 h-3.5" />
                {reunited?.value ?? "1,240+"} items reunited and counting
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Where kindness
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400">
                  finds its way home
                </span>
              </h1>
              <p className="mt-4 text-lg text-indigo-200 leading-relaxed max-w-xl">
                Every reunited belonging starts with someone who noticed,
                cared, and took action. This is the heartbeat of Bhetiyo.
              </p>
              {!isConnected && (
                <Link
                  to="/items"
                  className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full bg-white text-indigo-700 font-semibold text-sm hover:bg-indigo-50 transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
                >
                  Join our community
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
            <div className="flex-shrink-0 grid grid-cols-2 gap-3">
              <div className="space-y-3">
                <div className="w-32 h-32 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-4xl">
                  📸
                </div>
                <div className="w-32 h-20 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-2xl">
                  👛
                </div>
              </div>
              <div className="space-y-3 pt-6">
                <div className="w-32 h-20 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-2xl">
                  🐕
                </div>
                <div className="w-32 h-32 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-4xl">
                  📚
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm divide-y divide-slate-50 sm:divide-y-0 sm:flex sm:items-center">
          {stats.map((stat, i) => {
            const Icon = ICON_MAP[stat.icon] || RotateCcw;
            return (
              <div
                key={i}
                className="flex-1 flex items-center gap-4 px-6 py-4 sm:py-5"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-lg font-bold text-slate-800">{stat.value}</p>
                  <p className="text-xs text-slate-500">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-semibold mb-4">
            <MessageCircleHeart className="w-3.5 h-3.5" />
            Reunited Stories
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Every item has a story
          </h2>
          <p className="text-slate-500 mt-2 max-w-md mx-auto">
            Real moments of connection made possible by people like you.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
          </div>
        ) : (
          <div className="relative">
            {(!Array.isArray(stories) || stories.length === 0 ? STORIES : stories).map(
              (story, i) => (
                <div key={i} className="flex gap-6 pb-12 last:pb-0">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl shrink-0 border-2 border-white shadow-sm">
                      {(story as { emoji: string }).emoji || "🎉"}
                    </div>
                    {i < ((Array.isArray(stories) ? stories.length : 0) || STORIES.length) - 1 && (
                      <div className="w-0.5 flex-1 bg-gradient-to-b from-indigo-200 to-transparent mt-2" />
                    )}
                  </div>
                  <div className="flex-1 bg-white rounded-2xl border border-slate-100 shadow-sm p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-slate-800 text-base">
                        {(story as { title: string }).title}
                      </h3>
                      <span className="text-[10px] font-semibold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-full">
                        {(story as { by?: string }).by || "Community"}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {(story as { description: string | null }).description
                        ? (story as { description: string }).description.length > 150
                          ? `${(story as { description: string }).description.slice(0, 150)}...`
                          : (story as { description: string }).description
                        : "Successfully returned to its owner."}
                    </p>
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center gap-1 text-xs text-slate-400">
                        <MapPin className="w-3 h-3" />
                        {(story as { location: string }).location}
                      </div>
                      {(story as { returned_at?: string }).returned_at && (
                        <div className="flex items-center gap-1 text-xs text-slate-400">
                          <Calendar className="w-3 h-3" />
                          {new Date((story as { returned_at: string }).returned_at).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        )}
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-br from-indigo-50 via-white to-amber-50 rounded-3xl border border-indigo-100/50 p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100/80 text-indigo-700 text-xs font-semibold mb-4">
                <Heart className="w-3 h-3" />
                Get Involved
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                Ready to make a difference?
              </h2>
              <p className="text-sm text-slate-500 mt-3 leading-relaxed max-w-md">
                Whether you've lost something or found something, every action ripples
                through our community. One report can change someone's day.
              </p>
              <div className="flex flex-wrap gap-3 mt-6">
                <Link
                  to="/items"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-[0.98]"
                >
                  Browse items
                  <ArrowRight className="w-4 h-4" />
                </Link>
                {!isConnected && (
                  <Link
                    to="/items"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-slate-700 text-sm font-semibold border border-slate-200 hover:bg-slate-50 transition-all"
                  >
                    Join free
                  </Link>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
              <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-indigo-100/50 p-4 text-center min-w-[130px]">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center mx-auto mb-2">
                  <BadgeCheck className="w-4 h-4 text-indigo-500" />
                </div>
                <p className="text-xs font-semibold text-slate-700">Verified</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Google sign-in</p>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-indigo-100/50 p-4 text-center min-w-[130px]">
                <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center mx-auto mb-2">
                  <Gift className="w-4 h-4 text-amber-500" />
                </div>
                <p className="text-xs font-semibold text-slate-700">Free</p>
                <p className="text-[10px] text-slate-400 mt-0.5">No fees</p>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-indigo-100/50 p-4 text-center min-w-[130px]">
                <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center mx-auto mb-2">
                  <Heart className="w-4 h-4 text-rose-500" />
                </div>
                <p className="text-xs font-semibold text-slate-700">Kind</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Be respectful</p>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-indigo-100/50 p-4 text-center min-w-[130px]">
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center mx-auto mb-2">
                  <Shield className="w-4 h-4 text-slate-500" />
                </div>
                <p className="text-xs font-semibold text-slate-700">Private</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Data safe</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isError && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-amber-200 shadow-lg text-xs text-amber-600">
            <Loader2 className="w-3 h-3" />
            Offline — showing cached data
          </div>
        </div>
      )}
    </div>
  );
};
