import React, { useState } from "react";
import { createPortal } from "react-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { X, Navigation, MapPin, MapPinHouse } from "lucide-react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default Leaflet marker icons
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const LocationManager = ({ position, setPosition }) => {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return position === null ? null : (
    <Marker
      position={position}
      draggable={true}
      eventHandlers={{
        dragend(e) {
          setPosition(e.target.getLatLng());
        },
      }}
    />
  );
};

const LocateButton = () => {
  const map = useMap();

  const handleLocate = (e) => {
    e.preventDefault();
    e.stopPropagation();
    map.locate().on("locationfound", (e) => {
      map.flyTo(e.latlng, 16);
    });
  };

  return (
    <button
      onClick={handleLocate}
      type="button"
      title="Find my current location"
      className="absolute bottom-6 right-6 z-[1000] p-3 bg-white text-slate-700 hover:text-blue-600 rounded-full shadow-md border border-slate-200/80 transition-all active:scale-95 group bg-gradient-to-b from-white to-slate-50"
    >
      <MapPinHouse className="w-5 h-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </button>
  );
};

export const Map = ({ isOpen, onClose, onConfirm }) => {
  //   if (!isOpen) return null;

  const [position, setPosition] = useState(null);
  const defaultCenter = [28, 84]; // Defaulted cleanly to Pokhara coordinates

  const handleConfirmSelection = () => {
    if (position && onConfirm) {
      onConfirm({ lat: position.lat, lng: position.lng });
    }
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop Dimmer overlay layer */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Main Structural Map Panel Card */}
      <div className="relative w-full max-w-3xl h-[85vh] md:h-[75vh] bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Header Ribbon bar */}
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-blue-50 rounded-lg text-blue-600">
              <MapPin className="w-4 h-4" />
            </div>
            <h2 className="font-semibold text-slate-800 text-base">
              Pin Item Location
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* The Viewport Map Layer Canvas Container */}
        <div className="flex-grow relative z-0 bg-slate-50">
          <MapContainer
            center={defaultCenter}
            zoom={7}
            className="h-full w-full z-0"
            zoomControl={false} // Removed default top-left controls to keep UI clean
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <LocateButton />
            <LocationManager position={position} setPosition={setPosition} />
          </MapContainer>
        </div>

        {/* Footer Action Metadata Ribbon Bar */}
        <div className="p-5 border-t border-slate-100 bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shrink-0">
          <div className="space-y-0.5">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Selected Coordinates
            </p>
            {position ? (
              <p className="text-sm font-mono text-slate-800 bg-slate-50 px-2 py-1 rounded border border-slate-100 inline-block">
                {position.lat.toFixed(6)}° N, {position.lng.toFixed(6)}° E
              </p>
            ) : (
              <p className="text-xs text-slate-400 italic">
                Click anywhere on the map grid to drop a pin...
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-50 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!position}
              onClick={handleConfirmSelection}
              className={`px-5 py-2.5 rounded-xl font-medium text-sm text-white shadow-sm transition-all active:scale-[0.98] ${
                position
                  ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                  : "bg-slate-300 cursor-not-allowed"
              }`}
            >
              Confirm Location
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};
