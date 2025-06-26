'use client';

import { MOOD_COLORS, NO_ENTRY_COLOR } from "../lib/constants";

interface MoodRingProps {
  moods: string[];
  day: number;
}


//onverts polar coordinates (angle, radius) to Cartesian coordinates (x, y)
// used to calculate the start and end points of the SVG arcs
function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

// generates d attribute for SVG path to draw an arc
//https://www.w3schools.com/graphics/svg_path.asp
function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
}

const MoodRing: React.FC<MoodRingProps> = ({ moods, day }) => {
  const radius = 30;
  const strokeWidth = 10;
  
  const renderRing = () => {
    if (!moods || moods.length === 0) {
      return (
        <circle
          cx="50"
          cy="50"
          r={radius}
          className={NO_ENTRY_COLOR}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
      );
    }

    if (moods.length === 1) {
      const colorClass = MOOD_COLORS[moods[0]]?.stroke || NO_ENTRY_COLOR;
      return (
        <circle
          cx="50"
          cy="50"
          r={radius}
          className={colorClass}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
      );
    }
    
    const uniqueMoods = [...new Set(moods)].slice(0, 4);
    const arcLength = 360 / uniqueMoods.length;

    return uniqueMoods.map((mood, index) => {
      const startAngle = index * arcLength;
      const endAngle = (index + 1) * arcLength - (uniqueMoods.length > 1 ? 5 : 0);
      const colorClass = MOOD_COLORS[mood]?.stroke || NO_ENTRY_COLOR;
      const pathData = describeArc(50, 50, radius, startAngle, endAngle);

      return (
        <path
          key={mood}
          className={colorClass}
          d={pathData}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
        />
      );
    });
  };

  return (
    <div className="relative w-full h-full">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {renderRing()}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-bold text-gray-700">
          {day}
        </span>
      </div>
    </div>
  );
};

export default MoodRing;