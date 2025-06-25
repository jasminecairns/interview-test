import React from 'react';
import { VoiceEntry } from '../lib/types';
import { normalizeMoods } from '../lib/utils';
import MoodRing from './mood-ring';


interface DayCellProps {
  date: Date;
  entry: VoiceEntry | undefined;
  onMouseEnter: (entry: VoiceEntry | undefined) => void;
  onMouseLeave: () => void;
  onClick: (entry: VoiceEntry | undefined) => void;
}

const DayCellComponent: React.FC<DayCellProps> = ({ date, entry, onMouseEnter, onMouseLeave, onClick }) => {
    const day = date.getDate();
    let label = `Date: ${day}.`;
    if (entry) {
        const moods = normalizeMoods(entry.mood);
        if (moods.length > 0) {
          label += ` Moods: ${moods.join(', ')}. Click to see details.`;
        } else {
          label += ' No mood recorded. Click to add one.'; // For future features
        }
      } else {
        label += ' No entry for this day.';
      }
  return (
    <div
        aria-label={label}
      className="border rounded-md aspect-square flex flex-col items-center justify-center p-1 cursor-pointer transition-all duration-200 hover:bg-gray-100 hover:shadow-md"
      onMouseEnter={() => onMouseEnter(entry)}
      onMouseLeave={onMouseLeave}
      onClick={() => onClick(entry)}
    >
      <div className="w-full h-full">
        <MoodRing moods={normalizeMoods(entry?.mood)} day={date.getDate()} />
      </div>
    </div>
  );
};

export const DayCell = React.memo(DayCellComponent);