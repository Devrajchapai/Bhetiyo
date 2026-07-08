import { useState, useEffect, useRef } from "react";
import { Bell, BellDot, BellRing, CircleUser } from "lucide-react";
import { SignUp } from "./Signup";
import { useNavigationBar } from "@/store/ui/navigationbar";
import { useAuth } from "@/store/data/auth";
import { useReportItemModal } from "@/store/ui/modals";
import { useNotifications } from "@/store/data/notification";
import { getSocket } from "@/lib/socket";

type Tabs = "home" | "item" | "community";

const NAV_ITEMS: { id: Tabs; label: string; navigateTo: string }[] = [
  { id: "home", label: "Home", navigateTo: "/" },
  { id: "item", label: "Lost & Found", navigateTo: "/items" },
  { id: "community", label: "Community", navigateTo: "/community" },
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

  const {
    unreadCount,
    notifications,
    fetchNotifications,
    fetchUnreadCount,
    markAsRead,
    markAllAsRead,
  } = useNotifications();

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isConnected) return;
    fetchNotifications();
    fetchUnreadCount();
  }, [isConnected]);

  useEffect(() => {
    if (!isConnected) return;
    const socket = getSocket();
    if (!socket) return;

    const handleNewNotification = (notif: any) => {
      useNotifications.getState().addNotification(notif);
    };

    socket.on("notification:new", handleNewNotification);
    return () => {
      socket.off("notification:new", handleNewNotification);
    };
  }, [isConnected]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdown]);

  return (
    <div className="sticky top-0 z-50 h-16 px-6 bg-white/75 border-b border-slate-200/60 backdrop-blur-xl shadow-[0_2px_16px_-2px_rgba(37,99,235,0.07)]">
      <div className="flex items-center justify-between h-full max-w-6xl mx-auto gap-6">
        {/* Logo */}
        <div className="flex items-baseline gap-1.5 shrink-0">
          <button
            className="text-[22px] font-semibold text-blue-600 tracking-tight leading-none cursor-pointer"
            onClick={() => {
              window.location.href = "/";
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
                  window.location.href = navigateTo;
                }}
                className={`relative px-4 py-1.5 text-[13.5px] font-medium rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap
                  ${
                    active
                      ? "text-blue-600 bg-blue-50/80"
                      : "text-slate-500 hover:text-slate-700 hover:bg-slate-100/70"
                  }`}
              >
                {label}
                {active && (
                  <span className="absolute -bottom-[9px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-500" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-6 shrink-0">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => {
                setShowDropdown((prev) => !prev);
                if (!showDropdown && isConnected) {
                  fetchUnreadCount();
                  fetchNotifications();
                }
              }}
              className="relative p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              {unreadCount > 0 ? (
                unreadCount > 9 ? (
                  <>
                    <BellRing size={20} className="text-slate-700" />
                    <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-[10px] font-bold text-white ring-2 ring-white rounded-full h-5 w-5 flex items-center justify-center">
                      9+
                    </span>
                  </>
                ) : (
                  <>
                    <BellDot size={20} className="text-slate-700" />
                    <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-[10px] font-bold text-white ring-2 ring-white rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  </>
                )
              ) : (
                <Bell size={20} className="text-slate-500" />
              )}
            </button>

            {showDropdown && isConnected && (
              <div className="absolute right-0 top-full mt-2 w-[360px] bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden z-50">
                <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100">
                  <h3 className="text-sm font-bold text-slate-800">Notifications</h3>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-[11px] font-semibold text-blue-600 hover:text-blue-700"
                    >
                      Mark all read
                    </button>
                  )}
                </div>
                <div className="max-h-[400px] overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="px-5 py-10 text-center text-sm text-slate-400">
                      No notifications yet
                    </div>
                  ) : (
                    notifications.slice(0, 20).map((notif) => (
                      <button
                        key={notif.id}
                        onClick={() => {
                          markAsRead(notif.id);
                          const target = notif.matched_item?.slug || notif.source_item?.slug;
                          if (target) {
                            window.location.href = `/items/${target}`;
                          }
                          setShowDropdown(false);
                        }}
                        className={`w-full text-left px-5 py-3.5 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0 ${
                          !notif.is_read ? "bg-blue-50/40" : ""
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm ${
                            notif.type === "match_found"
                              ? "bg-amber-100 text-amber-600"
                              : "bg-blue-100 text-blue-600"
                          }`}>
                            {notif.type === "match_found" ? "🔗" : "ℹ️"}
                          </div>
                          <div className="min-w-0">
                            <p className={`text-sm ${
                              !notif.is_read ? "font-bold text-slate-900" : "font-medium text-slate-700"
                            }`}>
                              {notif.title}
                            </p>
                            <p className={`text-xs mt-0.5 line-clamp-2 ${
                              !notif.is_read ? "text-slate-600" : "text-slate-500"
                            }`}>
                              {notif.message}
                            </p>
                            {notif.similarity_score && (
                              <span className="inline-block mt-1.5 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                                {notif.similarity_score}% match
                              </span>
                            )}
                            <p className="text-[10px] text-slate-400 mt-1">
                              {new Date(notif.created_at).toLocaleDateString(undefined, {
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

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
                window.location.href = "/profile";
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
