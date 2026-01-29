import { useEffect, useState } from "react";
import io from "socket.io-client";
import toast from "react-hot-toast";
import MapView from "../components/MapView";

const socket = io("http://127.0.0.1:3000");

export default function RiderPage() {
  const [assignedDriver, setAssignedDriver] = useState(null);
  const [reassignedDriver, setReassignedDriver] = useState(null);
  const [driverLocation, setDriverLocation] = useState(null);
  const [status, setStatus] = useState("idle");

  const riderLocation = { lat: 28.6, lng: 77.2 };

  const requestRide = () => {
    toast.loading("Searching for drivers…");
    setStatus("searching");
    setAssignedDriver(null);
    setReassignedDriver(null);
    socket.emit("request-ride", { location: riderLocation });
  };

  useEffect(() => {
    socket.on("ride-started", (driverName) => {
      toast.dismiss();
      toast.success(`Driver Assigned: ${driverName}`);
      setAssignedDriver(driverName);
      setStatus("assigned");
    });

    socket.on("driver-update", (data) => {
      setDriverLocation(data.coords);
    });

    socket.on("driver-stuck", () => {
      toast.error("Driver stuck in traffic! Reassigning…");
      setStatus("reassigning");
    });

    socket.on("new-driver-assigned", (data) => {
      toast.dismiss();
      toast.success(`New driver assigned → ${data.name}`);
      setAssignedDriver(data.name);
      setReassignedDriver(true);
      setDriverLocation(data.coords);
      setStatus("reassigned");
    });

    return () => {
      socket.off("ride-started");
      socket.off("driver-update");
      socket.off("driver-stuck");
      socket.off("new-driver-assigned");
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-transparent">
      {/* MAIN GLASS CARD (same as Driver Dashboard style) */}
      <div className="w-[480px] backdrop-blur-xl bg-white/30 border border-white/20 
                      shadow-2xl rounded-3xl p-7 space-y-6">

        <h1 className="text-3xl font-extrabold text-green-900 text-center tracking-wide drop-shadow">
          Rider Dashboard
        </h1>

        {/* Request Ride Button */}
        <button
          onClick={requestRide}
          className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-700 
          text-white font-semibold rounded-2xl shadow-lg hover:scale-[1.02] transition-transform"
        >
          Request Ride
        </button>

        {/* STATUS CARD */}
        <div className="p-4 bg-white/60 rounded-xl shadow-md border border-white/50">
          {status === "idle" && (
            <p className="text-gray-800 font-medium">Click "Request Ride" to begin.</p>
          )}

          {status === "searching" && (
            <p className="text-green-900 font-medium">Searching for nearby drivers…</p>
          )}

          {status === "assigned" && (
            <p className="text-green-900 font-bold">
              Driver Assigned: <span className="font-extrabold">{assignedDriver}</span>
            </p>
          )}

          {status === "reassigning" && (
            <p className="text-red-600 font-bold">Driver stuck → Reassigning…</p>
          )}

          {status === "reassigned" && (
            <p className="text-green-900 font-bold">
              New Driver Assigned:{" "}
              <span className="font-extrabold text-emerald-700">
                {assignedDriver}
              </span>{" "}
              <span className="text-sm text-purple-700">(reassigned)</span>
            </p>
          )}
        </div>

        {/* DRIVER INFO CARD */}
        {assignedDriver && (
          <div className="p-4 bg-white/60 rounded-xl shadow border border-white/50">
            <p className="text-gray-900 font-semibold">
              Driver: <span className="text-green-700">{assignedDriver}</span>
            </p>
            {reassignedDriver && (
              <p className="text-purple-700 text-sm mt-1">
                Driver was reassigned due to traffic.
              </p>
            )}
          </div>
        )}

        {/* MAP — same exact container style */}
        <div className="rounded-xl overflow-hidden shadow-xl border border-white/60 h-[330px]">
          <MapView
            riderLocation={riderLocation}
            driverLocation={driverLocation}
          />
        </div>

      </div>
    </div>
  );
}
