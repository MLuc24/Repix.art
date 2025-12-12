
import React from 'react';
import { ProjectSummaryCard } from './ProjectSummaryCard';
import { TimelineItem } from './TimelineItem';
import { MOCK_TIMELINE_EVENTS, MOCK_PROJECT_STATS } from '../../../services/mock/freelancer';

export const ProjectTimeline = () => {
  return (
    <div className="animate-fade-in-up">
      {/* 1. Summary Header */}
      <ProjectSummaryCard stats={MOCK_PROJECT_STATS} />

      {/* 2. Timeline List */}
      <div className="px-2">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Activity Log</h3>
        <div className="relative">
           {MOCK_TIMELINE_EVENTS.map((event, idx) => (
             <TimelineItem 
               key={event.id}
               event={event}
               isLast={idx === MOCK_TIMELINE_EVENTS.length - 1}
             />
           ))}
        </div>
      </div>
    </div>
  );
};
