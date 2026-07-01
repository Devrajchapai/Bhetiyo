import React, { useEffect, useState, useRef } from "react";
import {
  Upload,
  MapPin,
  Send,
  ShieldAlert,
  ChevronDown,
  X,
  CalendarPlus,
} from "lucide-react";
import { createPortal } from "react-dom";
import { useMapModal, useReportItemModal } from "@/store/ui/modals";
import { useNavigationBar } from "@/store/ui/navigationbar";
import { useAuth } from "@/store/data/auth";
import api from "@/api/client";
import { toast } from "sonner";

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
  const openMap = useMapModal((state) => state.openMap);
  const isMapOpen = useMapModal((state) => state.isMapOpen);
  const getAddress = useMapModal((state) => state.getAddress);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [address, setAddress] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    category: "Electronics",
    dateFound: "",
    location: "",
    description: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const isConnected = useAuth((state) => state.isConnected);
  const signingUp = useNavigationBar((state) => state.signingUp);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image selection via file browser or drag-and-drop
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setImages((prevImages) => {
        const combined = [...prevImages, ...selectedFiles];
        // Enforce max capacity of 3 images
        return combined.slice(0, 3);
      });
    }
  };

  const removeImage = (indexToRemove: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Stop click event from bubbling up to the upload container trigger
    setImages((prevImages) =>
      prevImages.filter((_, idx) => idx !== indexToRemove),
    );
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset file input target value
    }
  };

  const triggerFileInput = () => {
    if (images.length < 3) {
      fileInputRef.current?.click();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected) {
      toast.error("Must be logged in to report");
      signingUp();
      return;
    }
    if (images.length === 0) return;
    setSubmitting(true);

    try {
      const fd = new FormData();
      fd.append("title", formData.title);
      fd.append("category", formData.category);
      fd.append("dateFound", formData.dateFound);
      fd.append("description", formData.description);
      fd.append("location", address);
      fd.append("source", action);
      images.forEach((file) => fd.append("image", file));

      await api.post("/item/upload", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Item reported successfully");
      handleClose();
    } catch (error) {
      toast.error("Failed to report item. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const temp = getAddress();
    setAddress(temp);
  }, [isMapOpen]);

  if (!isReportingItem || !action) return null;

  const handleClose = () => {
    closeReportItemModel();
    setAction("");
    setImages([]); // Clear state images on close
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

          {/* Drag & Drop Area / Click Wrapper */}
          <div
            onClick={triggerFileInput}
            className={`flex-1 min-h-[260px] border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-colors group ${
              images.length >= 3
                ? "border-slate-200 bg-slate-50/30 cursor-not-allowed"
                : "border-slate-200 bg-slate-50/50 hover:bg-slate-50 cursor-pointer"
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              multiple
              className="hidden"
              disabled={images.length >= 3}
            />

            <div className="p-4 bg-white rounded-full shadow-sm text-slate-400 group-hover:text-blue-600 transition-colors">
              <Upload className="w-6 h-6" />
            </div>
            <p className="mt-4 text-sm font-medium text-slate-700">
              {images.length >= 3 ? "MAX IMAGES REACHED" : "UPLOAD PHOTOS"}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {images.length >= 3
                ? "Remove an image to upload a different one"
                : "Up to 3 images • Click to browse"}
            </p>

            {/* Dynamic Previews Row Grid */}
            {images.length > 0 && (
              <div className="flex gap-3 mt-6 w-full justify-center flex-wrap">
                {images.map((file, idx) => (
                  <div
                    key={idx}
                    className="relative w-20 h-16 bg-slate-100 rounded-lg border border-slate-200 overflow-visible group/thumb shadow-sm"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${idx + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={(e) => removeImage(idx, e)}
                      className="absolute -top-1.5 -right-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full p-0.5 shadow transition-transform scale-90 hover:scale-100 z-30"
                      title="Remove image"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
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
              <div
                className="relative  cursor-pointer"
                onClick={() => dateInputRef.current?.showPicker()} // Triggers the calendar dropdown programmatically
              >
                {/* <CalendarPlus
                  size={20}
                  className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 z-10"
                /> */}
                <input
                  type="date"
                  name="dateFound"
                  ref={dateInputRef}
                  value={formData.dateFound}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#f3f5fa] border border-transparent focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all text-sm text-slate-800 outline-none dynamic-date-input"
                />
              </div>
            </div>
          </div>

          {/* Input: Location */}
          <div className="flex flex-col gap-2.5 w-full">
            <label className="text-xs font-semibold text-slate-600">
              Where was it encountered?
            </label>
            <div className="relative" onClick={() => openMap()}>
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="max-w-full h-fit pl-11 pr-4 py-3 rounded-xl bg-[#f3f5fa] border border-transparent focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all text-sm text-slate-800 placeholder:text-slate-400 outline-none truncate">
                {address === ""
                  ? "Select the location"
                  : address.length > 70
                    ? address.slice(0, 70) + "..."
                    : address}
              </span>
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
              disabled={submitting || images.length === 0}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#3b82f6] hover:bg-blue-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-medium text-sm transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98]"
            >
              <Send className="w-4 h-4" />
              <span className="capitalize">
                {submitting ? "Uploading..." : `${action} Item`}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
};
