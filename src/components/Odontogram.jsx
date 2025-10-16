import React, { useState } from 'react';
import Tooth from './Tooth';

const Odontogram = ({ toothChart, onToothUpdate }) => {
  const adultTeeth = {
    upperRight: [18, 17, 16, 15, 14, 13, 12, 11],
    upperLeft: [21, 22, 23, 24, 25, 26, 27, 28],
    lowerRight: [48, 47, 46, 45, 44, 43, 42, 41],
    lowerLeft: [31, 32, 33, 34, 35, 36, 37, 38]
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Dental Chart (Odontogram)</h3>
      
      <div className="grid grid-cols-1 gap-6">
        {/* Upper Jaw */}
        <div className="border-b-2 border-gray-300 pb-4">
          <div className="flex justify-between">
            {/* Upper Right */}
            <div className="flex gap-2">
              {adultTeeth.upperRight.map(number => (
                <Tooth
                  key={number}
                  number={number}
                  data={toothChart?.[number]}
                  onUpdate={(data) => onToothUpdate(number, data)}
                />
              ))}
            </div>
            {/* Upper Left */}
            <div className="flex gap-2">
              {adultTeeth.upperLeft.map(number => (
                <Tooth
                  key={number}
                  number={number}
                  data={toothChart?.[number]}
                  onUpdate={(data) => onToothUpdate(number, data)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Lower Jaw */}
        <div>
          <div className="flex justify-between">
            {/* Lower Right */}
            <div className="flex gap-2">
              {adultTeeth.lowerRight.map(number => (
                <Tooth
                  key={number}
                  number={number}
                  data={toothChart?.[number]}
                  onUpdate={(data) => onToothUpdate(number, data)}
                />
              ))}
            </div>
            {/* Lower Left */}
            <div className="flex gap-2">
              {adultTeeth.lowerLeft.map(number => (
                <Tooth
                  key={number}
                  number={number}
                  data={toothChart?.[number]}
                  onUpdate={(data) => onToothUpdate(number, data)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span>Healthy</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
          <span>Cavity</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span>Filled</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-purple-500 rounded"></div>
          <span>Root Canal</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-400 rounded"></div>
          <span>Missing</span>
        </div>
      </div>
    </div>
  );
};

export default Odontogram;
