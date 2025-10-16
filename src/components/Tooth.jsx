import React, { useState } from 'react';

const Tooth = ({ number, data, onUpdate }) => {
  const [showMenu, setShowMenu] = useState(false);

  const statusColors = {
    healthy: 'bg-green-500',
    cavity: 'bg-yellow-500',
    filled: 'bg-blue-500',
    'root-canal': 'bg-purple-500',
    crown: 'bg-indigo-500',
    bridge: 'bg-pink-500',
    implant: 'bg-cyan-500',
    missing: 'bg-gray-400',
    extracted: 'bg-red-500'
  };

  const currentColor = data?.status ? statusColors[data.status] : 'bg-white border-2 border-gray-300';

  const handleStatusChange = (status) => {
    onUpdate({ ...data, status });
    setShowMenu(false);
  };

  return (
    <div className="relative">
      <div
        className={`w-12 h-16 ${currentColor} rounded-lg cursor-pointer hover:shadow-lg transition-shadow flex items-center justify-center text-xs font-bold`}
        onClick={() => setShowMenu(!showMenu)}
      >
        {number}
      </div>

      {showMenu && (
        <div className="absolute z-10 mt-2 w-40 bg-white rounded-lg shadow-xl border border-gray-200 p-2">
          <div className="text-xs font-semibold mb-2 text-gray-700">Select Status:</div>
          {Object.entries(statusColors).map(([status, color]) => (
            <button
              key={status}
              onClick={() => handleStatusChange(status)}
              className="w-full text-left px-3 py-2 text-xs hover:bg-gray-100 rounded flex items-center gap-2"
            >
              <div className={`w-4 h-4 ${color} rounded`}></div>
              <span className="capitalize">{status.replace('-', ' ')}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tooth;
