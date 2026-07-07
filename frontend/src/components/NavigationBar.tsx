import { useState } from "react";
import { Bell, BellDot, BellRing, CircleUser, Search } from "lucide-react";
import { SignUp } from "./Signup";
import { useNavigationBar } from "@/store/ui/navigationbar";
import { useAuth } from "@/store/data/auth";
import { useReportItemModal } from "@/store/ui/modals";

type Tabs = "home" | "item" | "community";

const NAV_ITEMS: { id: Tabs; label: string; navigateTo: string }[] = [
  { id: "home", label: "Home", navigateTo: "/" },
  { id: "item", label: "Lost & Found", navigateTo: "items" },
  { id: "community", label: "Community", navigateTo: "community" },
];

export const NavigationBar = () => {
  const currentTab = useNavigationBar((state) => state.currentTab);
  const isConnected = useAuth((state) => state.isConnected);
  const changeTab = useNavigationBar((state) => state.changeTab);
  const signingUp = useNavigationBar((state) => state.signingUp);

  const openReportItemModel = useReportItemModal(
    (state) => state.openReportItemModel,
  );
  const setAction = useReportItemModal((state) => state.setAction);

  const [notification, setNotification] = useState(21);

  return (
    <div className="sticky top-0 z-50 h-16 px-6 bg-white/75 border-b border-slate-200/60 backdrop-blur-xl shadow-[0_2px_16px_-2px_rgba(37,99,235,0.07)]">
      <div className="flex items-center justify-between h-full max-w-6xl mx-auto gap-6">
        {/* Logo */}
        <div className="flex items-baseline gap-1.5 shrink-0">
          <button
            className="text-[22px] font-semibold text-blue-600 tracking-tight leading-none cursor-pointer"
            onClick={() => {
              navigation.navigate("/");
            }}
          >
            Bhetiyo
          </button>
          <span className="text-[10px] text-slate-400 font-normal leading-none pb-0.5">
            Restoring Faith
          </span>
        </div>

        {/* Nav tabs */}
        <div className="flex items-center gap-0.5">
          {NAV_ITEMS.map(({ id, label, navigateTo }) => {
            const active = currentTab === id;
            return (
              <button
                key={id}
                onClick={() => {
                  changeTab(id);
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
        <div className="flex items-center gap-6 shrink-0">
          {notification > 0 ? (
            <div className="flex w-fit h-fit">
              {notification > 9 ? (
                <>
                  <BellRing size={20} className="text-slate-700" />
                  <span className="relative -top-3 -right-0.5 bg-red-500 text-[10px] font-bold text-white ring-2 ring-white rounded-full h-5 w-5 flex justify-center items-center">
                    9+
                  </span>
                </>
              ) : (
                <>
                  <BellDot size={20} className="text-slate-700" />
                  <span className="relative -top-3 -right-0.5 bg-red-500 text-[10px] font-bold text-white ring-2 ring-white rounded-full h-5 w-5 flex justify-center items-center">
                    {notification}
                  </span>
                </>
              )}
            </div>
          ) : (
            <Bell size={20} />
          )}

          {/* Report a Find CTA */}
          <button
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-semibold shadow-sm shadow-blue-200 transition-all duration-200"
            onClick={() => {
              setAction("lost");
              openReportItemModel();
            }}
          >
            Report a Lost
          </button>

          {/* User */}
          {!isConnected ? (
            <button
              onClick={() => {
                // opens oauth authentication
                signingUp();
                console.log("oAuth connection is trigger");
              }}
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
              onClick={() => {
                // ... change here
                // ... navigate to user profile
                window.alert("need to work on this");
                console.log("user is connected");
              }}
              className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors duration-200"
            >
              <CircleUser size={20} className="text-slate-600" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
