import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export const Card = ({ item }) => {
  return (
    <Link
      to={`/items/${item.slug}`}
      key={item.id}
      className="snap-start flex-shrink-0 w-[280px] md:w-[320px] group bg-white rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden block"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span
            className={`text-[10px] font-bold px-3 py-1 rounded-full text-white tracking-wider ${
              item.type === "FOUND" ? "bg-emerald-500/90" : "bg-orange-500/90"
            }`}
          >
            {item.type}
          </span>
        </div>
      </div>

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
    </Link>
  );
};
