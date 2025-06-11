import React from "react";

export const Slider = ({ value, onChange, min, max, step, className }) => {
  const handleChange = (e) => {
    const newValue = parseInt(e.target.value);
    onChange([value[0], newValue]);
  };

  const handleMinChange = (e) => {
    const newValue = parseInt(e.target.value);
    if (newValue <= value[1]) {
      onChange([newValue, value[1]]);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center space-x-4">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value[0]}
          onChange={handleMinChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value[1]}
          onChange={handleChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>
      <div className="flex justify-between mt-2">
        <span className="text-sm text-gray-500">${value[0]}</span>
        <span className="text-sm text-gray-500">${value[1]}</span>
      </div>
    </div>
  );
}; 