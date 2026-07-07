import { Card } from "@/components/Card";
import { api } from "@/api";
import { useReportItemModal } from "@/store/ui/modals";
import { useNavigationBar } from "@/store/ui/navigationbar";
import { AlertTriangle, ListFilter, Loader2, PlusCircle, Search, X } from "lucide-react";
import { useState, useRef, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

const fetchItems = async () => {
  const { data } = await api.get("/item/items");
  return data.data;
};

const mapItemToCard = (item) => ({
  id: item.group_id,
  type: item.source.toUpperCase(),
  category: item.category,
  title: item.title,
  location: item.location,
  image: item.image,
  slug: item.slug,
  buttonText: item.source.toLowerCase() === "found" ? "That's mine!" : "Found this?",
});

export const LostAndFound = () => {
  const changeTab = useNavigationBar((state) => state.changeTab);
  const openReportItemModel = useReportItemModal(
    (state) => state.openReportItemModel,
  );
  const setAction = useReportItemModal((state) => state.setAction);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef(null);

  const { data: items = [], isLoading, isError } = useQuery({
    queryKey: ["items"],
    queryFn: fetchItems,
  });

  const tabs = [
    { id: "all", label: "All Items" },
    { id: "lost", label: "Only Lost" },
    { id: "found", label: "Only Found" },
  ];

  const filteredItems = useMemo(() => {
    let result = items;

    if (activeTab !== "all" && activeTab !== "filter") {
      result = result.filter(
        (item) => item.source.toLowerCase() === activeTab.toLowerCase(),
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          (item.description && item.description.toLowerCase().includes(q)) ||
          (item.location && item.location.toLowerCase().includes(q)),
      );
    }

    return result;
  }, [items, activeTab, searchQuery]);

  const handleSearchClick = () => {
    setIsSearching(true);
    // Focus the input immediately after state update
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleCloseSearch = () => {
    setIsSearching(false);
    setSearchQuery("");
  };

  useEffect(() => {
    changeTab("item");
  }, []);

  return (
    <div className="w-full bg-gradient-to-r from-slate-50 to-blue-50/30 pt-10 pb-6 px-8 md:px-16 flex flex-col gap-8 border-b border-slate-100">
      {/* Upper Row: Text Content & Actions */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-6 md:gap-20">
        {/* Left Text Content Section */}
        <div className="space-y-2 max-w-xl">
          <h2 className="text-xl md:text-2xl font-medium tracking-tight text-slate-800">
            Restore the Balance
          </h2>
          <p className="text-sm md:text-base text-slate-500 leading-relaxed">
            A calm and secure space to reconnect lost valuables with their
            rightful owners in Pokhara.
          </p>
        </div>

        {/* Right Interactive Actions Section */}
        <div className="flex items-center gap-4 sm:gap-6 self-start md:self-auto shrink-0">
          <button
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98]"
            onClick={() => {
              setAction("found");
              openReportItemModel();
            }}
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post Found</span>
          </button>
        </div>
      </div>
      {/* Lower Row: Conditionally Rendered Controls */}
      <div className="flex items-center justify-end w-full min-h-[60px]">
        {isSearching ? (
          /* Active Search View */
          <div className="w-full max-w-2xl relative flex items-center gap-2 transition-all duration-300">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search lost or found items (e.g., wallet, phone, keys)..."
              className="w-full pl-12 pr-12 py-3 rounded-full border border-slate-200 bg-white text-sm placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 shadow-sm text-slate-800"
            />
            {/* Close Search Button */}
            <button
              onClick={handleCloseSearch}
              className="absolute right-4 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* Default Navigation & Controls View */
          <div className="inline-flex gap-3 items-center bg-[#f1f3f9] p-1.5 rounded-full relative overflow-x-auto transition-all duration-300">
            {/* Tiny Search Trigger Button */}
            <button
              onClick={handleSearchClick}
              className="p-2.5 rounded-full text-slate-500 hover:text-blue-700 hover:bg-white transition-all duration-200"
              title="Open search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Segmented Control Tabs */}
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap min-w-[100px] sm:min-w-[120px]
                    ${
                      isActive
                        ? "bg-white text-blue-700 shadow-sm"
                        : "text-slate-500 hover:text-slate-800"
                    }
                  `}
                >
                  {tab.label}
                </button>
              );
            })}

            {/* Advanced Filters Button */}
            <button
              className={`p-2.5 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-200/50 transition-all duration-200 shrink-0 ${
                activeTab === "filter"
                  ? "bg-white text-blue-700 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
              title="Advance Filter"
              onClick={() => {
                setActiveTab("filter");
              }}
            >
              <ListFilter className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      <div className="w-full flex justify-center">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500">
            <AlertTriangle className="w-10 h-10 text-red-400 mb-3" />
            <p className="text-sm">Failed to load items. Please try again later.</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <Search className="w-10 h-10 mb-3" />
            <p className="text-sm">No items found.</p>
          </div>
        ) : (
          <div className="w-[80%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-7 gap-y-10 px-5 py-5">
            {filteredItems.map((item) => (
              <Card key={item.group_id} item={mapItemToCard(item)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
