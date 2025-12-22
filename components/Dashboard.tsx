
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { Session, QuestionStatus } from '../types';

interface DashboardProps {
  session: Session;
}

const Dashboard: React.FC<DashboardProps> = ({ session }) => {
  const chartData = session.records.map(r => ({
    name: `Q${r.questionNumber}`,
    time: r.timeInSeconds,
    status: r.status
  }));

  const stats = {
    totalTime: session.records.reduce((acc, r) => acc + r.timeInSeconds, 0),
    avgTime: session.records.length > 0 ? (session.records.reduce((acc, r) => acc + r.timeInSeconds, 0) / session.records.length).toFixed(1) : 0,
    accuracy: session.records.length > 0 ? ((session.records.filter(r => r.status === QuestionStatus.CORRECT).length / session.records.length) * 100).toFixed(0) : 0,
    counts: {
      [QuestionStatus.CORRECT]: session.records.filter(r => r.status === QuestionStatus.CORRECT).length,
      [QuestionStatus.INCORRECT]: session.records.filter(r => r.status === QuestionStatus.INCORRECT).length,
      [QuestionStatus.SKIPPED]: session.records.filter(r => r.status === QuestionStatus.SKIPPED).length,
    }
  };

  const getStatusColor = (status: QuestionStatus) => {
    switch (status) {
      case QuestionStatus.CORRECT: return '#10b981';
      case QuestionStatus.INCORRECT: return '#f43f5e';
      case QuestionStatus.SKIPPED: return '#94a3b8';
      default: return '#3b82f6';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
          <div className="text-xs font-bold text-gray-500 uppercase mb-1">Total Time</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {Math.floor(stats.totalTime / 60)}m {stats.totalTime % 60}s
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
          <div className="text-xs font-bold text-gray-500 uppercase mb-1">Avg / Question</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.avgTime}s</div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
          <div className="text-xs font-bold text-gray-500 uppercase mb-1">Accuracy</div>
          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{stats.accuracy}%</div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
          <div className="text-xs font-bold text-gray-500 uppercase mb-1">Solved</div>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{session.records.length}</div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Time per Question (Seconds)</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                itemStyle={{ fontWeight: 'bold' }}
              />
              <Bar dataKey="time" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getStatusColor(entry.status)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Detailed Breakdown</h3>
          <div className="space-y-3">
            {session.records.map((r, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-slate-900/50">
                <span className="font-bold text-gray-700 dark:text-gray-300">Question {r.questionNumber}</span>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-mono text-gray-500">{r.timeInSeconds}s</span>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                    r.status === QuestionStatus.CORRECT ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                    r.status === QuestionStatus.INCORRECT ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400' :
                    'bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-gray-400'
                  }`}>
                    {r.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
