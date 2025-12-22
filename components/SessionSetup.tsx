
import React, { useState } from 'react';
import { Subject } from '../types';

interface SessionSetupProps {
  onStart: (subject: Subject, chapter: string) => void;
}

const SessionSetup: React.FC<SessionSetupProps> = ({ onStart }) => {
  const [subject, setSubject] = useState<Subject>(Subject.PHYSICS);
  const [chapter, setChapter] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (chapter.trim()) {
      onStart(subject, chapter);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">New Study Session</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Subject</label>
          <div className="grid grid-cols-3 gap-3">
            {Object.values(Subject).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSubject(s)}
                className={`py-2 px-3 rounded-lg text-sm font-medium border transition-all ${
                  subject === s
                    ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                    : 'bg-white dark:bg-slate-700 border-gray-200 dark:border-slate-600 text-gray-600 dark:text-gray-300'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Chapter / Topic</label>
          <input
            type="text"
            required
            value={chapter}
            onChange={(e) => setChapter(e.target.value)}
            placeholder="e.g. Thermodynamics"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/30 transition-all transform active:scale-[0.98]"
        >
          Start Timer
        </button>
      </form>
    </div>
  );
};

export default SessionSetup;
