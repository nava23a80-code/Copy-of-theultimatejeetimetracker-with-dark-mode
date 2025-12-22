
import React, { useState, useEffect, useRef } from 'react';
import { PlayIcon, StopIcon, CheckIcon, XIcon, SkipIcon } from './Icons';
import { QuestionStatus } from '../types';

interface TimerProps {
  questionNumber: number;
  onQuestionComplete: (time: number, status: QuestionStatus) => void;
  onFinishSession: () => void;
}

const Timer: React.FC<TimerProps> = ({ questionNumber, onQuestionComplete, onFinishSession }) => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive]);

  const handleComplete = (status: QuestionStatus) => {
    onQuestionComplete(seconds, status);
    setSeconds(0);
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 w-full max-w-sm mx-auto">
      <div className="text-center mb-6">
        <div className="text-sm font-semibold text-gray-500 uppercase">Question</div>
        <div className="text-4xl font-bold dark:text-white">{questionNumber}</div>
      </div>

      <div className="text-center mb-8">
        <div className="text-5xl font-mono tabular-nums dark:text-white">
          {formatTime(seconds)}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-6">
        <button
          onClick={() => handleComplete(QuestionStatus.CORRECT)}
          className="p-3 rounded bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-bold text-sm"
        >
          Correct
        </button>
        <button
          onClick={() => handleComplete(QuestionStatus.INCORRECT)}
          className="p-3 rounded bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 font-bold text-sm"
        >
          Wrong
        </button>
        <button
          onClick={() => handleComplete(QuestionStatus.SKIPPED)}
          className="p-3 rounded bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 font-bold text-sm"
        >
          Skip
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <button
          onClick={() => setIsActive(!isActive)}
          className="w-full py-2 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white rounded font-medium"
        >
          {isActive ? 'Pause' : 'Resume'}
        </button>
        <button
          onClick={onFinishSession}
          className="w-full py-2 text-blue-600 dark:text-blue-400 font-medium underline text-sm"
        >
          End Session
        </button>
      </div>
    </div>
  );
};

export default Timer;
