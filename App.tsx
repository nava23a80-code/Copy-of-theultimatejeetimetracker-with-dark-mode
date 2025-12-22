
import React, { useState, useEffect, useRef } from 'react';

const App: React.FC = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive]);

  const handleStartStop = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setSeconds(0);
    setIsActive(true); // "time starts again" per requirement
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex flex-col items-center justify-center p-4 transition-colors duration-200">
      <div className="absolute top-4 right-4">
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="text-[10px] uppercase border border-gray-300 dark:border-zinc-700 px-2 py-1 rounded hover:bg-gray-50 dark:hover:bg-zinc-900"
        >
          {isDarkMode ? 'Light' : 'Dark'} Mode
        </button>
      </div>

      <div className="w-full max-w-xs text-center space-y-8">
        <h1 className="text-xs font-mono text-gray-400 dark:text-gray-600 uppercase tracking-[0.2em]">
          Speed Tracker
        </h1>

        <div className="text-7xl font-mono tabular-nums py-10 border-y border-gray-100 dark:border-zinc-900">
          {formatTime(seconds)}
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleStartStop}
            className={`w-full py-3 text-sm font-bold border ${
              isActive 
                ? 'bg-rose-50 border-rose-200 text-rose-700 dark:bg-rose-950 dark:border-rose-900 dark:text-rose-400' 
                : 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-950 dark:border-emerald-900 dark:text-emerald-400'
            } transition-colors`}
          >
            {isActive ? 'STOP' : 'START'}
          </button>
          
          <button
            onClick={handleReset}
            className="w-full py-3 text-sm font-medium border border-gray-200 dark:border-zinc-800 text-gray-500 dark:text-zinc-500 hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors"
          >
            RESET
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
