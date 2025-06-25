import MoodCalendar from '../components/mood-calendar';
import { mockVoiceEntries } from '../lib/mockData';


export default async function HomePage() {

  return (
    <main className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">My Mood Calendar</h1>
          <p className="mt-2 text-lg text-gray-600">A visual journal of your emotional well-being.</p>
        </header>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <MoodCalendar initialEntries={mockVoiceEntries} />
        </div>
      </div>
    </main>
  );
}