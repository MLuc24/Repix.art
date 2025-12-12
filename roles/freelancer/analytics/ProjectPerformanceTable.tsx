
import React, { useState } from 'react';
import { Icons } from '../../../shared/components/Icons';
import { ProjectMetric } from './types';

interface ProjectPerformanceTableProps {
  data: ProjectMetric[];
}

type SortField = 'time' | 'credits' | 'revisions';

export const ProjectPerformanceTable = ({ data }: ProjectPerformanceTableProps) => {
  const [sortField, setSortField] = useState<SortField>('time');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('desc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    let valA, valB;
    if (sortField === 'time') { valA = a.completionTime; valB = b.completionTime; }
    else if (sortField === 'revisions') { valA = a.revisions; valB = b.revisions; }
    else { valA = a.creditsUsed; valB = b.creditsUsed; }

    return sortDir === 'asc' ? valA - valB : valB - valA;
  });

  const SortIcon = ({ field }: { field: SortField }) => (
    <span className={`inline-block ml-1 transition-opacity ${sortField === field ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`}>
      {sortField === field && sortDir === 'asc' ? '↑' : '↓'}
    </span>
  );

  return (
    <div className="bg-[#1a1b26] border border-white/5 rounded-2xl overflow-hidden">
      <div className="p-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          Project History
        </h3>
        <p className="text-xs text-slate-500">Sorted by {sortField} ({sortDir})</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-black/20">
              <th className="p-4">Project</th>
              <th className="p-4 cursor-pointer group hover:text-white transition-colors" onClick={() => handleSort('time')}>
                Time {<SortIcon field="time" />}
              </th>
              <th className="p-4 cursor-pointer group hover:text-white transition-colors" onClick={() => handleSort('revisions')}>
                Revisions {<SortIcon field="revisions" />}
              </th>
              <th className="p-4 text-right cursor-pointer group hover:text-white transition-colors" onClick={() => handleSort('credits')}>
                Credits {<SortIcon field="credits" />}
              </th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {sortedData.map((project) => (
              <tr key={project.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-4">
                  <div className="font-bold text-slate-200">{project.name}</div>
                  <div className="text-xs text-slate-500">{project.clientName} • {project.date}</div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-300">{project.completionTime}d</span>
                    {project.completionTime < 2 && <span className="text-[9px] bg-green-500/20 text-green-400 px-1.5 rounded font-bold">FAST</span>}
                  </div>
                </td>
                <td className="p-4">
                  <span className={`${project.revisions > 2 ? 'text-orange-400' : 'text-slate-400'}`}>
                    {project.revisions}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <span className="font-mono text-cyan-400 font-bold">{project.creditsUsed}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
