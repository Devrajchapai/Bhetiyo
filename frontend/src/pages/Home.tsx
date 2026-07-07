import { Card } from "@/components/Card";
import { Button } from "@/components/ui/button";
import { useReportItemModal } from "@/store/ui/modals";
import { useNavigationBar } from "@/store/ui/navigationbar";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";
import {
  BadgeCheck,
  CirclePlus,
  HandHeart,
  Search,
  Trophy,
  RotateCcw,
  Users,
  TrendingUp,
  Loader2,
} from "lucide-react";
import { useEffect, useState } from "react";

const fetchHome = async () => {
  const { data } = await api.get("/home");
  return data.data;
};

export const Home = () => {
  const changeTab = useNavigationBar((state) => state.changeTab);
  const openReportItemModel = useReportItemModal(
    (state) => state.openReportItemModel,
  );
  const setAction = useReportItemModal((state) => state.setAction);

  const { data, isLoading } = useQuery({
    queryKey: ["home"],
    queryFn: fetchHome,
    staleTime: 60000,
  });

  useEffect(() => {
    changeTab("home");
  }, []);

  const items = data?.items ?? [];
  const stats = data?.stats;

  const ls = [
    { value: stats?.reunited ?? "—", label: "Returned", color: "text-blue-600" },
    { value: stats?.returnRate ?? "—", label: "Success", color: "text-emerald-600" },
    { value: "24h", label: "Avg. Time", color: "text-slate-600" },
    { value: stats?.members ?? "—", label: "Active", color: "text-orange-500" },
  ];

  const FALLBACK_HERO = [
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&q=80",
  ];

  const heroImages = data?.heroImages ?? [];
  const itemImages = items.map((i) => i.image).filter(Boolean);
  const fallbackImages = heroImages.length
    ? heroImages
    : itemImages.length
      ? itemImages
      : FALLBACK_HERO;

  const [heroLeft, setHeroLeft] = useState(0);
  const [heroRight, setHeroRight] = useState(1);

  useEffect(() => {
    if (fallbackImages.length) {
      const imgs = fallbackImages;
      let a: number, b: number;
      do {
        a = Math.floor(Math.random() * imgs.length);
        b = Math.floor(Math.random() * imgs.length);
      } while (imgs.length > 1 && a === b);
      setHeroLeft(a);
      setHeroRight(b);
    }
  }, [fallbackImages.length]);

  const mainImage = fallbackImages[heroLeft];
  const sideImage = fallbackImages[heroRight];
  const showSkeleton = isLoading || !data;

  return (
    <div>
      <div className="mx-6 md:mx-10 mt-14 mb-20">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-100">
              <BadgeCheck size={14} />
              {showSkeleton ? "Loading..." : `${stats?.reunited ?? "—"} Items Reunited`}
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
                onClick={() => {
                  setAction("found");
                  openReportItemModel();
                }}
              >
                <CirclePlus size={18} />
                Report Found Item
              </Button>
            </div>
          </div>

          <div className="flex-1 w-full lg:w-auto">
            <div className="flex flex-row gap-4 items-start justify-center lg:justify-start">
              <div className="relative rounded-[40px] overflow-hidden w-[300px] lg:w-[360px] h-[500px] shadow-2xl bg-slate-100">
                {mainImage ? (
                  <img
                    src={mainImage}
                    className="w-full h-full object-cover"
                    alt="Featured"
                  />
                ) : showSkeleton ? (
                  <div className="w-full h-full flex items-center justify-center text-slate-300">
                    <Loader2 className="w-8 h-8 animate-spin" />
                  </div>
                ) : null}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[85%] bg-white/80 backdrop-blur-md p-5 rounded-3xl shadow-lg border border-white/20">
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
                    Lost Item
                  </span>
                  <div className="flex justify-between items-center mt-1">
                    <h3 className="font-bold text-slate-800 text-lg">
                      Found Something?
                    </h3>
                    <span className="bg-[#e9dcc9] text-[#8b5e34] text-[10px] font-bold px-2 py-1 rounded-full">
                      REPORT IT
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="rounded-[40px] overflow-hidden w-[220px] lg:w-[260px] h-[260px] shadow-lg bg-slate-100">
                  {sideImage ? (
                    <img
                      src={sideImage}
                      className="w-full h-full object-cover"
                      alt="Community"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                      <Loader2 className="w-8 h-8 animate-spin" />
                    </div>
                  )}
                </div>

                <div className="flex flex-col justify-center items-center h-[220px] w-[220px] lg:w-[260px] rounded-[40px] bg-white border border-slate-100 shadow-xl p-6">
                  <div className="p-4 bg-blue-50 rounded-full mb-4">
                    <HandHeart size={32} className="text-blue-600" />
                  </div>
                  <span className="text-3xl font-extrabold text-slate-900">
                    {showSkeleton ? "—" : stats?.members ?? "—"}
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

      <section className="mx-10 p-5 mb-24 border rounded-4xl bg-[#F4F7FF]">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900">
            Recent Discoveries
          </h2>
          <p className="text-slate-500 mt-1">
            The latest items reported in community.
          </p>
        </div>

        <div className="flex overflow-x-auto pb-8 gap-6 snap-x snap-mandatory no-scrollbar">
          {showSkeleton
            ? Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="min-w-[260px] h-[340px] rounded-2xl bg-white/60 animate-pulse border border-slate-100 shrink-0"
                />
              ))
            : items.map((item, i) => (
                <Card item={item} key={item.id ?? i} />
              ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-12">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
                Community Impact
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed max-w-md">
                Our community is powered by heroes who go the extra mile. These
                individuals have helped reunite hundreds of items with their
                owners this month.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 border-t border-slate-100 pt-10">
              {ls.map((stat, i) => {
                const icons = [RotateCcw, TrendingUp, BadgeCheck, Users];
                const Icon = icons[i];
                return (
                  <div key={i} className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-slate-400 mb-1 max-lg:justify-center">
                      <Icon size={16} />
                      <span className="text-[11px] font-bold uppercase tracking-wider">
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

          <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-orange-50 text-orange-600 rounded-xl">
                <Trophy size={20} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Top Contributors
              </h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {showSkeleton
                ? Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-9 w-28 rounded-full bg-slate-100 animate-pulse"
                    />
                  ))
                : (Array.isArray(data?.topContributors) ? data.topContributors : []).slice(0, 8).map((hero, index) => (
                    <div
                      key={index}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-50 border border-slate-100 text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      <span className="text-xs text-slate-400">#{index + 1}</span>
                      {hero.avatar || hero.name?.charAt(0)}
                      <span>{hero.name}</span>
                    </div>
                  ))
              }
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
