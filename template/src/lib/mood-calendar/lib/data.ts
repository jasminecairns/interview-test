// ./lib/data-loader.ts
import 'server-only'; // This guard is still essential.

import fs from 'node:fs';
import path from 'node:path';
import Papa from 'papaparse';
import { VoiceEntry } from './types';
import { parseCustomDateString } from './utils';

interface RawCsvRow {
  transcript_user: string;
  created_at: string;
  mood: string;
  transcript_raw: string;
  emotion_score_score: string;
  // Add other raw string properties you need from the CSV
}

// The function is now the only export. There are no top-level calls.
export function loadMockEntries(): VoiceEntry[] {
  const csvPath = path.join(process.cwd(), 'data', 'Expanded_Diary_Entries.csv');

  let rawCsvData: string;
  try {
    // The file system is only accessed when this function is EXECUTED.
    rawCsvData = fs.readFileSync(csvPath, 'utf8');
  } catch (error) {
    console.error("🔴 Vercel Build Error: Could not read CSV file.", error);
    // In a production build, it's safer to fail loudly or return empty.
    return [];
  }

  const parsed = Papa.parse(rawCsvData, {
    header: true,
    skipEmptyLines: true,
  });
  
  const validData = (parsed.data as RawCsvRow[]).filter(row => row && row.created_at);

  const entries: VoiceEntry[] = validData.map((row, index): VoiceEntry => {
    const entryDate = parseCustomDateString(row.created_at);
    const moods = row.mood ? row.mood.split(',').map((m: string) => m.trim()) : [];
    
    return {
      id: String(index),
      user_id: 'mock',
      audio_url: null,
      transcript_raw: row.transcript_raw || '',
      transcript_user: row.transcript_user || '',
      language_detected: 'en',
      language_rendered: 'en',
      tags_model: [] as string[],
      tags_user: [] as string[],
      category: null,
      created_at: entryDate.toISOString(),
      updated_at: entryDate.toISOString(),
      emotion_score_score: parseFloat(row.emotion_score_score) || null,
      embedding: null,
      mood: moods,
    };
  });

  return entries;
}

// REMOVED THIS LINE: export const mockVoiceEntries = loadMockEntries();