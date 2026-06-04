import React, { useState } from "react";
import {
  Upload,
  MapPin,
  Send,
  ShieldAlert,
  ChevronDown,
  X,
} from "lucide-react";
import { createPortal } from "react-dom";
import { useReportItemModal } from "@/store/ui/modals";

export const ReportItemModal = () => {
  const isReportingItem = useReportItemModal((state) => state.isReportingItem);
  const action = useReportItemModal((state) => state.action);
  const openReportItemModel = useReportItemModal(
    (state) => state.openReportItemModel,
  );
  const closeReportItemModel = useReportItemModal(
    (state) => state.closeReportItemModel,
  );
  const setAction = useReportItemModal((state) => state.setAction);
  const [formData, setFormData] = useState({
    title: "",
    category: "Electronics",
    dateFound: "",
    location: "",
    description: "",
  });

  if (!isReportingItem || !action) return;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting Found Item Data:", formData);
  };

  const handleClose = () => {
    closeReportItemModel();
    setAction("");
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 1. Backdrop Overlay with a smooth blur */}
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-xl transition-opacity"
        onClick={handleClose}
      />

      {/* 2. Absolute-Centered Modal Card Container */}
      <div className="relative w-full max-w-5xl bg-gradient-to-br from-white via-slate-50/20 to-blue-50/20 p-8 md:p-12 rounded-3xl border border-slate-100 shadow-2xl flex flex-col lg:flex-row gap-10 max-h-[95vh] overflow-y-auto z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Quick Close Button Top Right */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT SIDE: Heading & Photo Upload */}
        <div className="w-full lg:w-2/5 flex flex-col justify-between gap-6">
          <div className="space-y-3">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#0f3c73] capitalize">
              {action} an Item
            </h2>
            <p className="text-sm md:text-base text-slate-500 leading-relaxed">
              Your kindness helps reunite families with their belongings.
            </p>
          </div>

          {/* Drag & Drop Area */}
          <div className="flex-1 min-h-[260px] border-2 border-dashed border-slate-200 bg-slate-50/50 hover:bg-slate-50 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors group">
            <div className="p-4 bg-white rounded-full shadow-sm text-slate-400 group-hover:text-blue-600 transition-colors">
              <Upload className="w-6 h-6" />
            </div>
            <p className="mt-4 text-sm font-medium text-slate-700">
              UPLOAD PHOTOS
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Drag and drop or click to browse
            </p>

            {/* Dummy preview thumbnails row */}
            <div className="flex gap-2 mt-6 w-full justify-center">
              <div className="w-16 h-12 bg-slate-200/60 rounded-md"></div>
              <div className="w-16 h-12 bg-slate-200/60 rounded-md"></div>
              <div className="w-16 h-12 bg-slate-200/60 rounded-md"></div>
            </div>
          </div>

          {/* Community Safety Notice Banner */}
          <div className="flex items-start gap-3 bg-emerald-50/60 border border-emerald-100 p-4 rounded-xl">
            <div className="p-1.5 bg-emerald-100 rounded-md text-emerald-700 shrink-0">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-xs font-semibold text-emerald-900">
                Community Safety First
              </h4>
              <p className="text-[11px] text-emerald-700 leading-normal">
                Do not share sensitive personal information like your exact
                address or public identification documents.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Interactive Form Inputs */}
        <form
          onSubmit={handleSubmit}
          className="w-full lg:w-3/5 flex flex-col gap-6"
        >
          {/* Input: Title */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-600">
              What item are you reporting?
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Black Leather Wallet"
              className="w-full px-4 py-3 rounded-xl bg-[#f3f5fa] border border-transparent focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all text-sm text-slate-800 placeholder:text-slate-400 outline-none"
            />
          </div>

          {/* Row: Category & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5 relative">
              <label className="text-xs font-semibold text-slate-600">
                Category
              </label>
              <div className="relative">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-[#f3f5fa] border border-transparent appearance-none focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all text-sm text-slate-800 outline-none pr-10"
                >
                  <option value="Electronics">Electronics</option>
                  <option value="Documents">Documents & Cards</option>
                  <option value="Wallets">Wallets & Bags</option>
                  <option value="Keys">Keys</option>
                  <option value="Others">Others</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-600">
                When was it encountered?
              </label>
              <input
                type="date"
                name="dateFound"
                value={formData.dateFound}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-[#f3f5fa] border border-transparent focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all text-sm text-slate-800 outline-none"
              />
            </div>
          </div>

          {/* Input: Location */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-600">
              Where was it encountered?
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
                <MapPin className="w-4 h-4" />
              </div>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="General area, park, or street name"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#f3f5fa] border border-transparent focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all text-sm text-slate-800 placeholder:text-slate-400 outline-none"
              />
            </div>
          </div>

          {/* Input: Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-600">
              Detailed Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Describe unique features, condition, or items inside..."
              className="w-full px-4 py-3 rounded-xl bg-[#f3f5fa] border border-transparent focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all text-sm text-slate-800 placeholder:text-slate-400 outline-none resize-none"
            />
          </div>

          {/* Actions Row */}
          <div className="flex items-center justify-end gap-6 mt-4">
            <button
              type="button"
              className="text-sm font-semibold text-[#0f3c73] hover:text-blue-700 transition-colors"
              onClick={handleClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#3b82f6] hover:bg-blue-600 text-white font-medium text-sm transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98]"
            >
              <Send className="w-4 h-4" />
              <span className="capitalize">{action} Item</span>
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
};
