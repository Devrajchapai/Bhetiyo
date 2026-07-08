import { MapPin, CheckCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth } from "@/store/data/auth";
import { useChat } from "@/store/data/chat";
import { useNavigationBar } from "@/store/ui/navigationbar";
import { toast } from "sonner";

export const Card = ({ item }) => {
  const isConnected = useAuth((state) => state.isConnected);
  const claimItem = useChat((state) => state.claimItem);
  const openChat = useChat((state) => state.openChat);
  const setActiveConversation = useChat((state) => state.setActiveConversation);
  const signingUp = useNavigationBar((state) => state.signingUp);

  const isResolved = item.resolved === true;

  const handleClaim = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isConnected) {
      signingUp();
      return;
    }

    const claimType = item.type?.toLowerCase() === "found" ? "group" : "private";

    try {
      const conversation = await claimItem(item.id, claimType);
      setActiveConversation(conversation.id);
      openChat();
      toast.success(
        claimType === "private"
          ? "Private conversation started with the poster"
          : "You've joined the group conversation",
      );
    } catch (err: any) {
      const msg = err?.response?.data?.error;
      if (msg === "You have already claimed this item") {
        toast.info("You've already claimed this item. Check your messages.");
        openChat();
      } else if (msg === "You cannot claim your own item") {
        toast.error("You cannot claim your own item");
      } else {
        toast.error("Failed to claim item. Please try again.");
      }
    }
  };

  return (
    <Link
      to={`/items/${item.slug}`}
      key={item.id}
      className={`snap-start flex-shrink-0 w-[280px] md:w-[320px] group bg-white rounded-[32px] border shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden block ${
        isResolved ? "border-emerald-200/60" : "border-slate-100"
      }`}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span
            className={`text-[10px] font-bold px-3 py-1 rounded-full text-white tracking-wider ${
              item.type === "FOUND" ? "bg-emerald-500/90" : "bg-orange-500/90"
            }`}
          >
            {item.type}
          </span>
          {isResolved && (
            <span className="text-[10px] font-bold px-3 py-1 rounded-full text-white tracking-wider bg-emerald-600/90 flex items-center gap-1">
              <CheckCheck className="w-3 h-3" />
              Returned
            </span>
          )}
        </div>
      </div>

      <div className="p-5 space-y-3">
        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
          {item.category}
        </span>
        <h3 className="font-bold text-slate-800 text-lg leading-tight line-clamp-1">
          {item.title}
        </h3>

        <a
          href={
            item.latitude && item.longitude
              ? `https://www.google.com/maps?q=${item.latitude},${item.longitude}`
              : `https://www.google.com/maps/search/${encodeURIComponent(item.location || "")}`
          }
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1.5 text-slate-400 text-sm hover:text-blue-600 transition-colors"
        >
          <MapPin size={14} className="flex-shrink-0" />
          <span className="truncate">{item.location}</span>
        </a>

        {isResolved ? (
          <div className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 text-sm font-semibold">
            <CheckCheck className="w-4 h-4" />
            Returned to owner
          </div>
        ) : (
          <Button
            variant="outline"
            onClick={handleClaim}
            className="w-full rounded-2xl border-blue-100 text-blue-600 font-bold hover:bg-blue-50 hover:text-blue-700 transition-colors py-5"
          >
            {item.buttonText}
          </Button>
        )}
      </div>
    </Link>
  );
};
