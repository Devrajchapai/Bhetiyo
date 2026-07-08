import { useAuth } from "@/store/data/auth";
import { useNavigationBar } from "@/store/ui/navigationbar";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";
import {
  CircleUser,
  Mail,
  LogOut,
  BadgeCheck,
  Fingerprint,
  Package,
  HandHeart,
  MapPin,
  Loader2,
  AlertTriangle,
  Calendar,
  SearchCheck,
} from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const fetchProfile = async () => {
  const { data } = await api.get("/profile");
  return data.data;
};

const ItemCard = ({ item, accent }: { item: any; accent: "blue" | "rose" | "emerald" }) => {
  const borderHover = accent === "blue" ? "hover:border-blue-200" : accent === "rose" ? "hover:border-rose-200" : "hover:border-emerald-200";
  const shadowHover = accent === "blue" ? "hover:shadow-blue-100" : accent === "rose" ? "hover:shadow-rose-100" : "hover:shadow-emerald-100";
  const tagBg = item.source === "lost" ? "bg-red-500" : "bg-emerald-500";

  return (
    <Link
      to={`/items/${item.slug}`}
      className={`group relative bg-white rounded-2xl border border-slate-100 overflow-hidden ${borderHover} ${shadowHover} hover:shadow-lg transition-all duration-200`}
    >
      <div className="aspect-[16/9] bg-slate-50 overflow-hidden">
        {item.image ? (
          <img
            src={item.image}
            alt=""
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">
            {item.source === "lost" ? "🔍" : "📦"}
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-slate-800 text-sm leading-snug line-clamp-2">
            {item.title}
          </h3>
          <span className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full text-white ${tagBg}`}>
            {item.source === "lost" ? "LOST" : "FOUND"}
          </span>
        </div>
        {item.location && (
          <div className="flex items-center gap-1 mt-2 text-xs text-slate-400">
            <MapPin className="w-3 h-3" />
            {item.location}
          </div>
        )}
        {item.created_at && (
          <div className="flex items-center gap-1 mt-1 text-xs text-slate-300">
            <Calendar className="w-3 h-3" />
            {new Date(item.created_at).toLocaleDateString()}
          </div>
        )}
      </div>
    </Link>
  );
};

export const Profile = () => {
  const { name, email, id, isConnected, disconnect } = useAuth();
  const changeTab = useNavigationBar((state) => state.changeTab);
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
    enabled: isConnected,
  });

  useEffect(() => {
    changeTab("home");
  }, []);

  if (!isConnected) {
    navigate("/");
    return null;
  }

  const handleLogout = () => {
    disconnect();
    navigate("/");
  };

  const uploaded = data?.uploaded ?? [];
  const claimed = data?.claimed ?? [];
  const resolved = data?.resolved ?? [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="px-6 md:px-10 lg:px-16 py-8 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-80 shrink-0">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden sticky top-24">
              <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 px-6 pt-10 pb-6 text-center overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white" />
                  <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-white" />
                </div>
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-white/25 to-white/10 backdrop-blur-sm mx-auto flex items-center justify-center border-2 border-white/30 shadow-lg shadow-black/10">
                    <span className="text-3xl font-bold text-white drop-shadow-sm">
                      {name?.charAt(0)?.toUpperCase() || "?"}
                    </span>
                  </div>
                  <div className="absolute -bottom-1 right-1/2 translate-x-14">
                    <div className="w-5 h-5 rounded-full bg-emerald-400 border-2 border-white flex items-center justify-center">
                      <BadgeCheck className="w-3 h-3 text-white" />
                    </div>
                  </div>
                </div>
                <h1 className="text-lg font-bold text-white mt-4">{name}</h1>
                <p className="text-xs text-blue-200/80 font-medium">Member</p>
                <div className="flex items-center justify-center gap-5 mt-6 pt-4 border-t border-white/10">
                  <div className="text-center">
                    <p className="text-xl font-bold text-white">{uploaded.length}</p>
                    <p className="text-[10px] text-blue-200/70 uppercase tracking-wider font-medium">Posted</p>
                  </div>
                  <div className="w-px h-8 bg-white/10" />
                  <div className="text-center">
                    <p className="text-xl font-bold text-white">{claimed.length}</p>
                    <p className="text-[10px] text-blue-200/70 uppercase tracking-wider font-medium">Claimed</p>
                  </div>
                  <div className="w-px h-8 bg-white/10" />
                  <div className="text-center">
                    <p className="text-xl font-bold text-white">{resolved.length}</p>
                    <p className="text-[10px] text-blue-200/70 uppercase tracking-wider font-medium">Found</p>
                  </div>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-3 px-3.5 py-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                      <CircleUser className="w-4 h-4 text-blue-500" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Name</p>
                      <p className="text-sm font-semibold text-slate-800 truncate">{name || "—"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 px-3.5 py-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4 text-violet-500" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Email</p>
                      <p className="text-sm font-semibold text-slate-800 truncate">{email || "—"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 px-3.5 py-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                      <Fingerprint className="w-4 h-4 text-amber-500" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">User ID</p>
                      <p className="text-sm font-semibold text-slate-800 truncate font-mono tracking-tight">#{id}</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white border border-red-100 text-red-500 text-sm font-semibold hover:bg-red-50 hover:border-red-200 transition-all active:scale-[0.98]"
                >
                  <LogOut className="w-4 h-4" />
                  Sign out
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            {isLoading ? (
              <div className="flex justify-center py-24">
                <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
              </div>
            ) : isError ? (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-amber-50 border border-amber-100 text-amber-700 text-sm">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                Could not load your items.
              </div>
            ) : (
              <div className="space-y-10">
                <section>
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center">
                      <Package className="w-4 h-4 text-blue-600" />
                    </div>
                    <h2 className="text-lg font-bold text-slate-800">Posted Items</h2>
                    <span className="text-xs text-slate-400 ml-auto">{uploaded.length} items</span>
                  </div>
                  {uploaded.length === 0 ? (
                    <div className="text-sm text-slate-400 py-12 text-center bg-white rounded-2xl border border-slate-100">
                      <Package className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                      <p>You haven't posted any items yet.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {uploaded.map((item) => (
                        <ItemCard key={item.id} item={item} accent="blue" />
                      ))}
                    </div>
                  )}
                </section>

                <section>
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-8 h-8 rounded-xl bg-rose-50 flex items-center justify-center">
                      <HandHeart className="w-4 h-4 text-rose-500" />
                    </div>
                    <h2 className="text-lg font-bold text-slate-800">Claimed Items</h2>
                    <span className="text-xs text-slate-400 ml-auto">{claimed.length} items</span>
                  </div>
                  {claimed.length === 0 ? (
                    <div className="text-sm text-slate-400 py-12 text-center bg-white rounded-2xl border border-slate-100">
                      <HandHeart className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                      <p>You haven't claimed any items yet.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {claimed.map((item) => (
                        <ItemCard key={item.id} item={item} accent="rose" />
                      ))}
                    </div>
                  )}
                </section>

                <section>
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center">
                      <SearchCheck className="w-4 h-4 text-emerald-600" />
                    </div>
                    <h2 className="text-lg font-bold text-slate-800">Found It</h2>
                    <span className="text-xs text-slate-400 ml-auto">{resolved.length} items</span>
                  </div>
                  {resolved.length === 0 ? (
                    <div className="text-sm text-slate-400 py-12 text-center bg-white rounded-2xl border border-slate-100">
                      <SearchCheck className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                      <p>No items found yet.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {resolved.map((item) => (
                        <ItemCard key={item.id} item={item} accent="emerald" />
                      ))}
                    </div>
                  )}
                </section>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
