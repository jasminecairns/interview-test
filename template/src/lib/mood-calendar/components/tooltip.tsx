import { MOOD_COLORS } from '../lib/constants';
import { VoiceEntry } from '../lib/types';


interface TooltipProps {
  entry: VoiceEntry;
}

export const Tooltip: React.FC<TooltipProps> = ({ entry }) => {
  const moods = Array.isArray(entry.mood) ? entry.mood : (entry.mood ? [entry.mood] : []);
  
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 p-3 bg-gray-800 text-white rounded-lg shadow-lg pointer-events-none">
      <p className="font-bold mb-2">
        {new Date(entry.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
      </p>
      <div className="flex flex-wrap gap-1">
        {moods.map((mood) => (
          <span
            key={mood}
            className={`text-xs font-semibold px-2 py-0.5 rounded-full text-white ${MOOD_COLORS[mood]?.bg || 'bg-gray-400'}`}
          >
            {mood}
          </span>
        ))}
      </div>
    </div>
  );
};