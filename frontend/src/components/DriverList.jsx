export default function DriverList({ drivers }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 mt-4">
      <h3 className="text-lg font-bold mb-2 text-purple-700">Online Drivers</h3>

      {drivers.length === 0 && (
        <p className="text-gray-500">No drivers online</p>
      )}

      {drivers.map((d, idx) => (
        <p key={idx} className="text-sm font-semibold text-gray-700">
          🚗 {d.name}
        </p>
      ))}
    </div>
  );
}
