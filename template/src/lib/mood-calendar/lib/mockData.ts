import fs from 'node:fs';
import path from 'node:path';
import Papa from 'papaparse';
import { VoiceEntry } from './types';
import { parseCustomDateString } from './utils';

const csvPath = path.join(process.cwd(), 'data', 'Expanded_Diary_Entries.csv');

interface RawCsvRow {
  transcript_user: string;
  transcript_raw: string;
  created_at: string;
  mood: string;
  emotion_score_score: string;
}

function loadAndParseEntries(): VoiceEntry[] {
  let rawCsvData: string;
  try {
    rawCsvData = fs.readFileSync(csvPath, 'utf8');
  } catch (error) {
    console.error("🔴 Critical Error: Could not read CSV file during build.", error);
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

export const mockVoiceEntries: VoiceEntry[] = loadAndParseEntries();