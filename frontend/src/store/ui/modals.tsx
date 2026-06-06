import { create } from "zustand";

type actionType = "lost" | "found" | "";

interface ReportingItemType {
  isReportingItem: boolean;
  action: actionType;

  openReportItemModel: () => void;
  closeReportItemModel: () => void;
  setAction: (currentAction: actionType) => void;
}

interface MapType {
  isMapOpen: boolean;
  latitude: null | number;
  longitude: null | number;
  address: string;
  openMap: () => void;
  closeMap: () => void;
  setCoordinates: (latitude: number, longitude: number) => void;
  setAddress: (address: string) => void;
  getAddress: () => string;
}

export const useReportItemModal = create<ReportingItemType>((set) => ({
  isReportingItem: false,
  action: "",

  openReportItemModel: () => set({ isReportingItem: true }),
  closeReportItemModel: () => set({ isReportingItem: false }),
  setAction: (currentAction) => set({ action: currentAction }),
}));

export const useMapModal = create<MapType>((set, get) => ({
  isMapOpen: false,
  address: "",
  latitude: null,
  longitude: null,

  openMap: () => set({ isMapOpen: true }),
  closeMap: () => set({ isMapOpen: false }),
  setCoordinates: (latitude, longitude) => set({ latitude, longitude }),
  setAddress: (address) => set({ address }),
  getAddress: () => {
    const { address } = get();
    return `${address}`;
  },
}));
