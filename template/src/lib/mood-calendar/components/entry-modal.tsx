'use client';

import { VoiceEntry } from '../lib/types';
import { MOOD_COLORS } from '../lib/constants';


interface EntryModalProps {
  entry: VoiceEntry;
  onClose: () => void;
}

const EntryModal: React.FC<EntryModalProps> = ({ entry, onClose }) => {
  if (!entry) return null;

  const formattedDate = new Date(entry.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Normalize `entry.mood` into a guaranteed array
  const moodsToDisplay = Array.isArray(entry.mood)
    ? entry.mood 
    : (entry.mood ? [entry.mood] : []);


  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl p-6 m-4 max-w-lg w-full z-50"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">{formattedDate}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl">×</button>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {moodsToDisplay.map((mood) => (
            <span
              key={mood}
              className={`text-white text-sm font-semibold px-3 py-1 rounded-full ${
                MOOD_COLORS[mood]?.bg || 'bg-gray-400'
              }`}
            >
              {mood}
            </span>
          ))}
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Journal Entry</h3>
          <p className="text-gray-600 whitespace-pre-wrap bg-gray-50 p-4 rounded-md">
            {entry.transcript_user || 'No journal entry for this day.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EntryModal;