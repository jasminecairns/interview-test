export function normalizeMoods(mood: string | string[] | undefined | null): string[] {
    if (Array.isArray(mood)) {
      return mood;
    }
    if (typeof mood === 'string' && mood.length > 0) {
      return [mood];
    }
    return [];
  }


export function parseCustomDateString(dateString: string): Date {
  if (!dateString) return new Date(); 

  const parts = dateString.split(' ');
  const dateParts = parts[0].split('/');
  const timeParts = parts[1] ? parts[1].split(':') : [0, 0];

  const month = parseInt(dateParts[0], 10) - 1; // Month is 0-indexed
  const day = parseInt(dateParts[1], 10);
  const year = parseInt(dateParts[2], 10);
  let hours;
  let minutes;
  if (typeof timeParts[0] === 'string' && typeof timeParts[1] === 'string') {
     hours = parseInt(timeParts[0], 10);
     minutes = parseInt(timeParts[1], 10);
  }

  return new Date(year, month, day, hours, minutes);
}