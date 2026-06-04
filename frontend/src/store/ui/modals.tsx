import { create } from "zustand";

type actionType = "lost" | "found" | "";

interface ReportingItemType {
  isReportingItem: boolean;
  action: actionType;

  openReportItemModel: () => void;
  closeReportItemModel: () => void;
  setAction: (currentAction: actionType) => void;
}

export const useReportItemModal = create<ReportingItemType>((set) => ({
  isReportingItem: false,
  action: "",

  openReportItemModel: () => set({ isReportingItem: true }),
  closeReportItemModel: () => set({ isReportingItem: false }),
  setAction: (currentAction) => set({ action: currentAction }),
}));
