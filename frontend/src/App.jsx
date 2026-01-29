import { useState } from "react";
import RiderPage from "./pages/RiderPage";
import DriverPage from "./pages/DriverPage";

export default function App() {
  const [screen, setScreen] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2B2B2B] to-[#C6A27D] bg-fixed p-6 flex items-center justify-center">

      {/* HOME SCREEN */}
      {!screen && (
        <div className="flex flex-col items-center gap-8 animate-fadeIn">

          {/* 🔥 TOP HERO SECTION */}
          <div className="text-center space-y-3">
            <h2 className="text-4xl font-extrabold text-white drop-shadow-lg tracking-wide">
              Smarter Rides. Powered by Real-Time AI.
            </h2>

            <p className="text-lg text-white/90 font-medium tracking-wide">
              Intelligent Dispatch • Live GPS Tracking • Auto Reassignment Engine
            </p>

            {/* 🔹 Feature Badges */}
            <div className="flex gap-3 justify-center mt-2">
              <span className="px-4 py-1 rounded-full bg-white/20 text-white text-sm font-semibold backdrop-blur-md shadow">
                Smart AI Matching
              </span>
              <span className="px-4 py-1 rounded-full bg-white/20 text-white text-sm font-semibold backdrop-blur-md shadow">
                Live Location Sync
              </span>
              <span className="px-4 py-1 rounded-full bg-white/20 text-white text-sm font-semibold backdrop-blur-md shadow">
                Instant Reassignment
              </span>
            </div>
          </div>

          {/* 🔷 GLASS CARD */}
          <div className="p-10 bg-white/30 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 w-[400px] text-center">

            <h1 className="text-3xl font-extrabold mb-6 text-green-900 drop-shadow">
              AI Ride System
            </h1>

            <button
              onClick={() => setScreen("rider")}
              className="w-full py-3 mb-4 bg-gradient-to-r from-green-400 to-green-700 text-white font-semibold rounded-xl shadow-lg hover:scale-[1.03] transition-transform"
            >
              Rider
            </button>

            <button
              onClick={() => setScreen("driver")}
              className="w-full py-3 bg-gradient-to-r from-lime-400 to-green-600 text-white font-semibold rounded-xl shadow-lg hover:scale-[1.03] transition-transform"
            >
              Driver
            </button>

            {/* Signature Line */}
            <p className="text-sm mt-6 text-green-900 font-semibold opacity-80">
              Developed by <span className="text-green-700 font-bold">Bhumika Tyagi</span>
            </p>
          </div>
        </div>
      )}

      {/* RIDER SCREEN */}
      {screen === "rider" && <RiderPage />}

      {/* DRIVER SCREEN */}
      {screen === "driver" && <DriverPage />}
    </div>
  );
}
