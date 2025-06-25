'use client';

import { useState, useMemo } from 'react';
import { VoiceEntry } from '../lib/types';
import { DayCell } from './day-cell';
import EntryModal from './entry-modal';
import { Tooltip } from './tooltip';


interface MoodCalendarProps {
  initialEntries: VoiceEntry[];
}

type CalendarCell = 
  | { key: string; isEmpty: true }
  | { key: string; isEmpty?: false; date: Date; entry: VoiceEntry | undefined };

const MoodCalendar: React.FC<MoodCalendarProps> = ({ initialEntries }) => {
  const [currentDate, setCurrentDate] = useState(new Date('2025-05-15'));
  const [selectedEntry, setSelectedEntry] = useState<VoiceEntry | null>(null);
  const [hoveredEntry, setHoveredEntry] =useState<VoiceEntry | null>(null);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const toYYYYMMDD = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const entriesByDate = useMemo(() => {
    const map: Record<string, VoiceEntry> = {};
    for (const entry of initialEntries) {
      const entryDate = new Date(entry.created_at);
      const dateString = toYYYYMMDD(entryDate);
      map[dateString] = entry;
    }
    return map;
  }, [initialEntries]);

  const calendarGrid: CalendarCell[] = useMemo(() => {
    const grid: CalendarCell[] = [];
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startDayOfWeek = firstDayOfMonth.getDay();
    for (let i = 0; i < startDayOfWeek; i++) {
      grid.push({ key: `empty-start-${i}`, isEmpty: true });
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateString = toYYYYMMDD(date);
      const entry = entriesByDate[dateString];
      grid.push({ key: dateString, date, entry });
    }
    const totalCells = grid.length;
    const remainingCells = (7 - (totalCells % 7)) % 7;
    for (let i = 0; i < remainingCells; i++) {
      grid.push({ key: `empty-end-${i}`, isEmpty: true });
    }
    return grid;
  }, [currentDate, entriesByDate]);
  
  const changeMonth = (offset: number) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + offset);
      return newDate;
    });
  };

  return (
    <div className="p-4 max-w-4xl mx-auto font-sans relative">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => changeMonth(-1)} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">prev</button>
        <h2 className="text-2xl font-bold text-gray-700">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <button onClick={() => changeMonth(1)} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">next</button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {calendarGrid.map((cell) => {
          if ('isEmpty' in cell) {
            return <div key={cell.key} className="border rounded-md bg-gray-50"></div>;
          }
          
          return (
            <DayCell
            key={cell.key}
            date={cell.date}
            entry={cell.entry}
            onMouseEnter={(entry) => 
            {
              if (entry) {
                setHoveredEntry(entry);
                setIsTooltipVisible(true);
              }
            }}
            onMouseLeave={() => 
              setIsTooltipVisible(false)}
            onClick={() => cell.entry && setSelectedEntry(cell.entry)}
          />
          );
        })}
      </div>
      
      {hoveredEntry && (
        <div
          // The conditional class is the key here.
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 transition-opacity duration-200 ease-in-out
            ${isTooltipVisible ? 'opacity-100' : 'opacity-0'}`
          }
        >
          <Tooltip entry={hoveredEntry} />
        </div>
      )}

      {selectedEntry && (
        <EntryModal entry={selectedEntry} onClose={() => setSelectedEntry(null)} />
      )}
    </div>
  );
};

export default MoodCalendar;