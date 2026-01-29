import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";

const selfIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  iconSize: [40, 40],
});

const riderIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [40, 40],
});

const carIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/3097/3097144.png",
  iconSize: [45, 45],
});

export default function MapView({ riderLocation, driverLocation }) {
  const isDriverScreen = driverLocation === null;

  return (
    <MapContainer
      center={[riderLocation.lat, riderLocation.lng]}
      zoom={14}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Rider marker (user) */}
      <Marker
        position={[riderLocation.lat, riderLocation.lng]}
        icon={isDriverScreen ? selfIcon : riderIcon}
      />

      {/* DRIVER MARKER ONLY ON RIDER SCREEN */}
      {!isDriverScreen && driverLocation && (
        <Marker
          position={[driverLocation.lat, driverLocation.lng]}
          icon={carIcon}
        />
      )}
    </MapContainer>
  );
}
