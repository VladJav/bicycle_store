'use client';
import { useState } from 'react';

const ColorSelect = ({ colors }: { colors: string[] }) => {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  return (
    <div className="flex space-x-3">
      {colors.map((color: string) => (
        <button
          key={color}
          onClick={() => setSelectedColor(color)}
          className={`rounded-full border px-4 py-2 text-sm ${
            selectedColor === color
              ? 'border-[#415444] bg-[#e0e5ce] text-[#415444]'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          {color}
        </button>
      ))}
    </div>
  );
};

export default ColorSelect;
