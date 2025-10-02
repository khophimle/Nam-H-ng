
import React from 'react';

interface PanelProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const Panel: React.FC<PanelProps> = ({ title, children, className }) => {
  return (
    <div className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl shadow-lg flex flex-col ${className}`}>
      <div className="bg-slate-900/40 px-6 py-3 rounded-t-xl border-b border-slate-700/50">
        <h2 className="text-lg font-semibold text-cyan-300">{title}</h2>
      </div>
      <div className="p-6 flex-grow overflow-y-auto">
        {children}
      </div>
    </div>
  );
};
