import { useState } from "react";
import { CircleUser, Search } from "lucide-react";

type Tabs = "home" | "item" | "community";

const NAV_ITEMS: { id: Tabs; label: string; navigateTo: string }[] = [
  { id: "home", label: "Home", navigateTo: "/" },
  { id: "item", label: "Lost & Found", navigateTo: "bhetiyo" },
  { id: "community", label: "Community", navigateTo: "community" },
];

export const NavigationBar = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [selectedTab, setSelectedTab] = useState<Tabs>("home");

  return (
    <nav className="sticky top-0 z-50 h-16 px-6 bg-white/75 border-b border-slate-200/60 backdrop-blur-xl shadow-[0_2px_16px_-2px_rgba(37,99,235,0.07)]">
      <div className="flex items-center justify-between h-full max-w-6xl mx-auto gap-6">
        {/* Logo */}
        <div className="flex items-baseline gap-1.5 shrink-0">
          <span className="text-[22px] font-semibold text-blue-600 tracking-tight leading-none">
            Bhetiyo
          </span>
          <span className="text-[10px] text-slate-400 font-normal leading-none pb-0.5">
            Restoring Faith
          </span>
        </div>

        {/* Nav tabs */}
        <div className="flex items-center gap-0.5">
          {NAV_ITEMS.map(({ id, label, navigateTo }) => {
            const active = selectedTab === id;
            return (
              <button
                key={id}
                onClick={() => {
                  setSelectedTab(id);
                  navigation.navigate(navigateTo);
                }}
                className={`relative px-4 py-1.5 text-[13.5px] font-medium rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap
                  ${
                    active
                      ? "text-blue-600 bg-blue-50/80"
                      : "text-slate-500 hover:text-slate-700 hover:bg-slate-100/70"
                  }`}
              >
                {label}
                {/* Active dot */}
                {active && (
                  <span className="absolute -bottom-[9px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-500" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Report a Find CTA */}
          <button className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-semibold shadow-sm shadow-blue-200 transition-all duration-200">
            Report a Find
          </button>

          {/* User */}
          {!isUserLoggedIn ? (
            <button
              onClick={() => setIsUserLoggedIn(true)}
              className="group flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 shadow-sm"
            >
              <CircleUser
                size={15}
                className="text-slate-400 group-hover:text-blue-500 transition-colors"
              />
              <span className="text-xs font-medium text-slate-500 group-hover:text-blue-600 transition-colors">
                Sign in
              </span>
            </button>
          ) : (
            <button
              onClick={() => setIsUserLoggedIn(false)}
              className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors duration-200"
            >
              <CircleUser size={20} className="text-slate-600" />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
