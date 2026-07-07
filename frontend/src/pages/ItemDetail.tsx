import { api } from "@/api";
import { useNavigationBar } from "@/store/ui/navigationbar";
import { AlertTriangle, ArrowLeft, Calendar, ChevronLeft, ChevronRight, Loader2, MapPin, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export const ItemDetail = () => {
  const { slug } = useParams();
  const changeTab = useNavigationBar((state) => state.changeTab);
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    changeTab("item");
  }, []);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError(false);

    api
      .get(`/item/slug/${slug}`)
      .then(({ data }) => {
        setItem(data.data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-slate-500 gap-4">
        <AlertTriangle className="w-12 h-12 text-red-400" />
        <p className="text-sm">Item not found.</p>
        <Link
          to="/items"
          className="text-blue-600 hover:text-blue-700 text-sm font-medium underline"
        >
          Back to all items
        </Link>
      </div>
    );
  }

  const images = item.images || [];
  const currentImage = images[activeImage]?.url || item.image || "";

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/items"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to items</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-4">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100">
              {currentImage ? (
                <img
                  src={currentImage}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-slate-300">
                  No image available
                </div>
              )}

              {images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setActiveImage((prev) =>
                        prev === 0 ? images.length - 1 : prev - 1,
                      )
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-sm transition-all"
                  >
                    <ChevronLeft className="w-5 h-5 text-slate-700" />
                  </button>
                  <button
                    onClick={() =>
                      setActiveImage((prev) =>
                        prev === images.length - 1 ? 0 : prev + 1,
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-sm transition-all"
                  >
                    <ChevronRight className="w-5 h-5 text-slate-700" />
                  </button>
                </>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setActiveImage(idx)}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      idx === activeImage
                        ? "border-blue-500 ring-2 ring-blue-200"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <img
                      src={img.url}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <span
                className={`inline-block text-xs font-bold px-3 py-1 rounded-full text-white tracking-wider ${
                  item.source?.toUpperCase() === "FOUND"
                    ? "bg-emerald-500"
                    : "bg-orange-500"
                }`}
              >
                {item.source?.toUpperCase() || "FOUND"}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
              {item.title}
            </h1>

            <span className="inline-block text-sm font-semibold text-blue-600 uppercase tracking-wide">
              {item.category}
            </span>

            {item.description && (
              <p className="text-slate-600 leading-relaxed text-sm">
                {item.description}
              </p>
            )}

            <div className="space-y-3 pt-2">
              {item.location && (
                <div className="flex items-center gap-3 text-slate-500 text-sm">
                  <MapPin className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  <span>{item.location}</span>
                </div>
              )}

              {item.dateFound && (
                <div className="flex items-center gap-3 text-slate-500 text-sm">
                  <Calendar className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  <span>{item.dateFound}</span>
                </div>
              )}

              {item.poster && (
                <div className="flex items-center gap-3 text-slate-500 text-sm">
                  <User className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  <span>Posted by {item.poster.name}</span>
                </div>
              )}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <button className="flex-1 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-all shadow-sm hover:shadow-md active:scale-[0.98]">
                {item.source?.toLowerCase() === "found"
                  ? "Claim This Item"
                  : "I Found This"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
