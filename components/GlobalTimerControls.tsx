import React from 'react';
import { Play, Pause, X, Timer } from 'lucide-react';
import clsx from 'clsx';

interface GlobalTimerControlsProps {
  isOpen: boolean;
  isPaused: boolean;
  remainingTimeMs: number;
  totalTimeMs: number;
  onPause: () => void;
  onResume: () => void;
  onClose: () => void;
}

export const GlobalTimerControls: React.FC<GlobalTimerControlsProps> = ({
  isOpen,
  isPaused,
  remainingTimeMs,
  totalTimeMs,
  onPause,
  onResume,
  onClose,
}) => {
  if (!isOpen) return null;

  const formatTime = (ms: number) => {
    const totalSeconds = Math.max(0, Math.floor(ms / 1000));
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progress = Math.max(0, Math.min(100, (remainingTimeMs / totalTimeMs) * 100));
  const isOvertime = remainingTimeMs < 0;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[60] flex items-start justify-end p-4">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />
      
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 w-80 relative mt-16 animate-in slide-in-from-top-4 duration-200 overflow-hidden z-10 transition-colors duration-200">
        <div className="bg-gray-50 dark:bg-gray-900 p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
          <h3 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <Timer size={18} className="text-blue-600 dark:text-blue-400" />
            Session Timer
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full p-1">
            <X size={16} />
          </button>
        </div>

        <div className="p-6 text-center">
          <div className={clsx(
            "text-4xl font-mono font-bold mb-2 tabular-nums",
            isOvertime ? "text-red-500 dark:text-red-400" : "text-gray-800 dark:text-white"
          )}>
             {isOvertime ? '-' : ''}{formatTime(Math.abs(remainingTimeMs))}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider mb-6">
            {isOvertime ? 'Overtime' : 'Remaining Ideal Time'}
          </p>

          {/* Progress Bar */}
          {!isOvertime && (
            <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full mb-6 overflow-hidden">
              <div 
                className={clsx("h-full transition-all duration-1000", progress < 20 ? "bg-red-500 dark:bg-red-400" : "bg-blue-500 dark:bg-blue-400")}
                style={{ width: `${progress}%` }} 
              />
            </div>
          )}

          <div className="flex gap-3">
            {!isPaused ? (
              <button 
                onClick={onPause}
                className="flex-1 flex items-center justify-center gap-2 bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 py-3 rounded-xl font-semibold hover:bg-yellow-100 dark:hover:bg-yellow-900/50 transition-colors border border-yellow-200 dark:border-yellow-800"
              >
                <Pause size={18} fill="currentColor" /> Pause
              </button>
            ) : (
              <button 
                onClick={onResume}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 dark:bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors shadow-lg shadow-blue-200 dark:shadow-none"
              >
                <Play size={18} fill="currentColor" /> Resume
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};