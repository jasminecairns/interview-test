import fs from 'node:fs';
import path from 'node:path';
import Papa from 'papaparse';
import { VoiceEntry } from './types'; 

const csvPath = path.join(process.cwd(), 'data', 'Expanded_Diary_Entries.csv');

interface RawCsvRow {
  transcript_raw: string;
  transcript_user: string;
  created_at: string;
  emotion_score_score: string;
  mood: string;
}

let rawCsvData = '';
try {
  rawCsvData = fs.readFileSync(csvPath, 'utf8');
} catch (error) {
  console.error("🔴 FAILED TO READ CSV FILE:", error);
  rawCsvData = 'dummy\nline';
}

function parseAndBuildEntries(): VoiceEntry[] {
  if (rawCsvData === 'dummy\nline') {
    return [];
  }

  const parsed = Papa.parse(rawCsvData, {
    header: true,
    skipEmptyLines: true,
  });

  const entries: VoiceEntry[] = (parsed.data as RawCsvRow[]).map((row, index): VoiceEntry => {
    
    let moods: string[] = [];
    if (row.mood) {
      moods = row.mood.split(',').map((m: string) => m.trim());
    }
    
    const entryDate = new Date(row.created_at);
    const isoDate = !isNaN(entryDate.getTime()) ? entryDate.toISOString() : new Date().toISOString();

    const finalEntry: VoiceEntry = {
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
      created_at: isoDate,
      updated_at: isoDate,
      emotion_score_score: parseFloat(row.emotion_score_score) || null,
      embedding: null, 
      mood: moods,
    };
    
    return finalEntry;
  });

  return entries;
}

export const mockVoiceEntries: VoiceEntry[] = parseAndBuildEntries();