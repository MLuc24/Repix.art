import React from 'react';

interface LogoProps {
  className?: string;
  collapsed?: boolean;
  onClick?: () => void;
}

export const Logo = ({ className = "", collapsed = false, onClick }: LogoProps) => {
  return (
    <div 
      onClick={onClick}
      className={`flex items-center gap-3 cursor-pointer group select-none ${className}`}
    >
      <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center text-white font-bold text-xl group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-violet-500/30 transition-all duration-300 shadow-lg shadow-violet-500/20">
        R
      </div>
      {!collapsed && (
        <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-violet-600 dark:group-hover:text-violet-200 transition-colors">
          REPIX.art
        </span>
      )}
    </div>
  );
};
