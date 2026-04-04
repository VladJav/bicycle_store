'use client';
interface ColorSelectProps {
  colors: string[];
  setSelectedColor: (color: string) => void;
  selectedColor: string;
}

const ColorSelect = ({ colors, setSelectedColor, selectedColor }: ColorSelectProps) => {
  return (
    <div className="flex space-x-3">
      {colors.map((color: string) => (
        <button
          key={color}
          onClick={() => setSelectedColor(color)}
          className={`rounded-full border px-4 py-2 text-sm ${
            selectedColor === color
              ? 'border-primary bg-primary/20 text-primary'
              : 'border-input hover:border-muted'
          }`}
        >
          {color}
        </button>
      ))}
    </div>
  );
};

export default ColorSelect;
