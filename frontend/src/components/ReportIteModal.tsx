import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  Upload,
  MapPin,
  Send,
  ShieldAlert,
  ChevronDown,
  X,
  Image,
  Type,
  Tag,
  Calendar,
  FileText,
  Trash2,
  AlertCircle,
} from "lucide-react";
import { createPortal } from "react-dom";
import { useMapModal, useReportItemModal } from "@/store/ui/modals";
import { useNavigationBar } from "@/store/ui/navigationbar";
import { useAuth } from "@/store/data/auth";
import api from "@/api/client";
import { toast } from "sonner";

const categories = [
  { value: "Electronics", label: "Electronics", icon: "📱" },
  { value: "Documents", label: "Documents & Cards", icon: "📄" },
  { value: "Wallets", label: "Wallets & Bags", icon: "👛" },
  { value: "Keys", label: "Keys", icon: "🔑" },
  { value: "Clothing", label: "Clothing", icon: "👕" },
  { value: "Accessories", label: "Accessories", icon: "⌚" },
  { value: "Others", label: "Others", icon: "📦" },
];

export const ReportItemModal = () => {
  const isReportingItem = useReportItemModal((state) => state.isReportingItem);
  const action = useReportItemModal((state) => state.action);
  const closeReportItemModel = useReportItemModal(
    (state) => state.closeReportItemModel,
  );
  const setAction = useReportItemModal((state) => state.setAction);
  const openMap = useMapModal((state) => state.openMap);
  const isMapOpen = useMapModal((state) => state.isMapOpen);
  const getAddress = useMapModal((state) => state.getAddress);
  const mapLatitude = useMapModal((state) => state.latitude);
  const mapLongitude = useMapModal((state) => state.longitude);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [address, setAddress] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "Electronics",
    dateFound: "",
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

  const processFiles = useCallback((files: FileList | File[]) => {
    const selectedFiles = Array.from(files);
    setImages((prev) => {
      const combined = [...prev, ...selectedFiles];
      return combined.slice(0, 3);
    });
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) processFiles(e.target.files);
  };

  useEffect(() => {
    setImagePreviews(images.map((file) => URL.createObjectURL(file)));
    return () => imagePreviews.forEach((url) => URL.revokeObjectURL(url));
  }, [images]);

  const removeImage = (indexToRemove: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const triggerFileInput = () => {
    if (images.length < 3) fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files) processFiles(e.dataTransfer.files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected) {
      toast.error("Must be logged in to report");
      signingUp();
      return;
    }
    if (!formData.title.trim()) {
      toast.error("Please enter an item title");
      return;
    }
    if (images.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }
    setSubmitting(true);

    try {
      const fd = new FormData();
      fd.append("title", formData.title);
      fd.append("category", formData.category);
      fd.append("dateFound", formData.dateFound);
      fd.append("description", formData.description);
      fd.append("location", address);
      if (mapLatitude !== null) fd.append("latitude", String(mapLatitude));
      if (mapLongitude !== null) fd.append("longitude", String(mapLongitude));
      fd.append("source", action);
      images.forEach((file) => fd.append("image", file));

      await api.post("/item/upload", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Item reported successfully");
      handleClose();
    } catch {
      toast.error("Failed to report item. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const temp = getAddress();
    if (temp) setAddress(temp);
  }, [isMapOpen]);

  if (!isReportingItem || !action) return null;

  const handleClose = () => {
    closeReportItemModel();
    setAction("");
    setImages([]);
    setFormData({
      title: "",
      category: "Electronics",
      dateFound: "",
      description: "",
    });
    setAddress("");
  };

  const isLost = action === "lost";

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-slate-100 z-10 animate-[fadeIn_0.2s_ease-out]">
        <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between rounded-t-3xl z-10">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                isLost
                  ? "bg-orange-50 text-orange-600"
                  : "bg-emerald-50 text-emerald-600"
              }`}
            >
              {isLost ? "🔍" : "✨"}
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800 capitalize">
                Report {action} Item
              </h2>
              <p className="text-xs text-slate-400">
                Help reunite someone with their belonging
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="md:col-span-2 space-y-4">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Photos <span className="text-red-400">*</span>
              </label>

              <div
                onClick={triggerFileInput}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-2xl p-5 flex flex-col items-center justify-center text-center transition-all min-h-[200px] ${
                  dragOver
                    ? "border-blue-400 bg-blue-50"
                    : images.length >= 3
                      ? "border-slate-200 bg-slate-50"
                      : "border-slate-200 bg-slate-50/50 hover:border-blue-300 hover:bg-blue-50/30 cursor-pointer"
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

                {images.length === 0 ? (
                  <>
                    <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center mb-3">
                      <Image className="w-5 h-5 text-slate-400" />
                    </div>
                    <p className="text-sm font-medium text-slate-600">
                      Upload photos
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Drag & drop or click to browse
                    </p>
                    <p className="text-[10px] text-slate-300 mt-2">
                      Up to 3 images (max 5MB each)
                    </p>
                  </>
                ) : (
                  <div className="w-full space-y-3">
                    <div className="grid grid-cols-3 gap-2">
                      {images.map((file, idx) => (
                        <div
                          key={idx}
                          className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 group/img border border-slate-200"
                        >
                          <img
                            src={imagePreviews[idx]}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/20 transition-colors" />
                          <button
                            type="button"
                            onClick={(e) => removeImage(idx, e)}
                            className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-lg p-1 opacity-0 group-hover/img:opacity-100 transition-opacity shadow-lg"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                          <div className="absolute bottom-1 left-1 bg-black/50 text-white text-[10px] px-1.5 py-0.5 rounded-md">
                            {Math.round(file.size / 1024)}KB
                          </div>
                        </div>
                      ))}
                      {images.length < 3 && (
                        <button
                          type="button"
                          onClick={triggerFileInput}
                          className="aspect-square rounded-xl border-2 border-dashed border-slate-200 hover:border-blue-300 flex items-center justify-center text-slate-300 hover:text-blue-400 transition-colors bg-slate-50/50"
                        >
                          <Upload className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-400">
                      {images.length}/3 images
                    </p>
                  </div>
                )}
              </div>

              <div className="flex items-start gap-3 bg-amber-50/80 border border-amber-100 p-3.5 rounded-xl">
                <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-[11px] font-semibold text-amber-800">
                    Safety Tip
                  </p>
                  <p className="text-[10px] text-amber-700 leading-relaxed mt-0.5">
                    Don't share personal info like your exact address or ID
                    documents in photos.
                  </p>
                </div>
              </div>
            </div>

            <div className="md:col-span-3 space-y-4">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Item Details
              </label>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-slate-600 mb-1.5 block">
                    Title <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Type className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g. Black Leather Wallet"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all text-sm text-slate-800 placeholder:text-slate-400 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-slate-600 mb-1.5 block">
                      Category
                    </label>
                    <div className="relative">
                      <Tag className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all text-sm text-slate-800 outline-none appearance-none"
                      >
                        {categories.map((cat) => (
                          <option key={cat.value} value={cat.value}>
                            {cat.icon} {cat.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-600 mb-1.5 block">
                      Date encountered
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
                      <input
                        type="date"
                        name="dateFound"
                        ref={dateInputRef}
                        value={formData.dateFound}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all text-sm text-slate-800 outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-600 mb-1.5 block">
                    Location
                  </label>
                  <button
                    type="button"
                    onClick={() => openMap()}
                    className="w-full flex items-center gap-3 pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 hover:bg-white hover:border-blue-300 hover:shadow-sm transition-all text-sm text-left relative group"
                  >
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 group-hover:text-blue-500 transition-colors" />
                    <span
                      className={`truncate ${
                        address ? "text-slate-800" : "text-slate-400"
                      }`}
                    >
                      {address || "Tap to pick a location on map"}
                    </span>
                  </button>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-600 mb-1.5 block">
                    Description
                  </label>
                  <div className="relative">
                    <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                      maxLength={500}
                      placeholder="Describe unique features, color, brand, or anything that helps identify it..."
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all text-sm text-slate-800 placeholder:text-slate-400 outline-none resize-none"
                    />
                    <span className="absolute right-3 bottom-3 text-[10px] text-slate-400">
                      {formData.description.length}/500
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={handleClose}
              className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || !formData.title.trim() || images.length === 0}
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium text-sm transition-all shadow-sm hover:shadow-md active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 ${
                isLost
                  ? "bg-orange-500 hover:bg-orange-600 text-white"
                  : "bg-emerald-500 hover:bg-emerald-600 text-white"
              }`}
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span className="capitalize">
                    {isLost ? "Report Lost" : "Post Found"}
                  </span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
};
