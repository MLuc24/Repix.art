
import React from 'react';
import { Icons } from '../../../shared/components/Icons';
import { TimelineEvent, TimelineEventType } from '../../../services/mock/freelancer';

interface TimelineItemProps {
  event: TimelineEvent;
  isLast: boolean;
  key?: React.Key;
}

const getEventStyles = (type: TimelineEventType) => {
  switch (type) {
    case 'milestone': return { icon: <Icons.Star className="w-3 h-3" />, bg: 'bg-slate-500', text: 'text-slate-200' };
    case 'status_change': return { icon: <Icons.Refresh className="w-3 h-3" />, bg: 'bg-orange-500', text: 'text-orange-200' };
    case 'upload': return { icon: <Icons.Upload className="w-3 h-3" />, bg: 'bg-blue-500', text: 'text-blue-200' };
    case 'generation': return { icon: <Icons.Sparkles className="w-3 h-3" />, bg: 'bg-violet-500', text: 'text-violet-200' };
    case 'delivery': return { icon: <Icons.Check className="w-3 h-3" />, bg: 'bg-green-500', text: 'text-green-200' };
    default: return { icon: <Icons.FileText className="w-3 h-3" />, bg: 'bg-slate-500', text: 'text-slate-200' };
  }
};

export const TimelineItem = ({ event, isLast }: TimelineItemProps) => {
  const styles = getEventStyles(event.type);

  return (
    <div className="flex gap-4">
      {/* Left Column: Line & Icon */}
      <div className="flex flex-col items-center relative">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 border-2 border-[#0e0f13] ${styles.bg} text-white shadow-lg`}>
          {styles.icon}
        </div>
        {!isLast && (
          <div className="flex-1 w-px bg-white/10 my-1" />
        )}
      </div>

      {/* Right Column: Content */}
      <div className="flex-1 pb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
           <h4 className="text-sm font-bold text-white">{event.title}</h4>
           <span className="text-[10px] text-slate-500 font-mono">{event.timestamp}</span>
        </div>
        
        {event.description && (
          <p className="text-xs text-slate-400 bg-white/5 p-2 rounded-lg border border-white/5 inline-block">
            {event.description}
          </p>
        )}
        
        <p className="text-[10px] text-slate-600 mt-1">
          By <span className="font-bold text-slate-500">{event.actor}</span>
        </p>
      </div>
    </div>
  );
};
