export function normalizeMoods(mood: string | string[] | undefined | null): string[] {
    if (Array.isArray(mood)) {
      return mood;
    }
    if (typeof mood === 'string' && mood.length > 0) {
      return [mood];
    }
    return [];
  }