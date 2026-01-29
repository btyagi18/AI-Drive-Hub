import { useEffect, useState } from "react";
import io from "socket.io-client";
import toast from "react-hot-toast";
import MapView from "../components/MapView";

const socket = io("http://127.0.0.1:3000");

export default function DriverPage() {
  const [online, setOnline] = useState(false);
  const [myLocation, setMyLocation] = useState({ lat: 28.6, lng: 77.2 });

  const name = "Driver_" + Math.floor(Math.random() * 900 + 100);

  const goOnline = () => {
    socket.emit("driver-online", { name, location: myLocation });
    setOnline(true);
    toast.success("You are now Online!");
  };

  useEffect(() => {
    let stuckSimulated = false;

    const interval = setInterval(() => {
      if (!online) return;

      // Normal movement first
      if (!stuckSimulated) {
        const newLocation = {
          lat: myLocation.lat + Math.random() / 200,
          lng: myLocation.lng + Math.random() / 200,
        };

        setMyLocation(newLocation);

        socket.emit("driver-location", {
          coords: newLocation,
          speed: Math.random() * 10 + 3,
        });
      }

      // Simulate stuck scenario randomly
      if (!stuckSimulated && Math.random() < 0.25) {
        stuckSimulated = true;
        console.log("Driver stuck simulated");
      }

      // If stuck → freeze location and speed
      if (stuckSimulated) {
        socket.emit("driver-location", {
          coords: myLocation,
          speed: 0,
        });
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [online, myLocation]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-transparent">

      {/* Card */}
      <div className="w-[450px] backdrop-blur-xl bg-white/40 border border-white/50 shadow-2xl rounded-3xl p-6 space-y-6">

        <h1 className="text-3xl font-extrabold text-green-900 text-center tracking-wide drop-shadow">
          Driver Dashboard
        </h1>

        {/* Go Online Button */}
        {!online && (
          <button
            onClick={goOnline}
            className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 
            text-white font-bold rounded-xl shadow-lg hover:scale-[1.03] transition-transform
            animate-fade animate-duration-700"
          >
            Go Online
          </button>
        )}

        {/* Online Status Card */}
        {online && (
          <div className="p-4 bg-white/60 rounded-xl shadow-md border border-white/70 animate-fade">
            <p className="font-semibold text-lg text-green-900">
              Status: <span className="text-green-700">Online</span>
            </p>
            <p className="text-sm text-green-800 opacity-80">Name: {name}</p>

            <div className="flex items-center gap-2 mt-2">
              <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-green-700 text-sm">Sending live location…</span>
            </div>
          </div>
        )}

        {/* Map Box */}
        <div className="rounded-xl overflow-hidden shadow-xl border border-white/60 h-[330px]">
          <MapView riderLocation={myLocation} driverLocation={null} />
        </div>

      </div>
    </div>
  );
}
