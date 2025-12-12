
import React from 'react';
import { ProjectCreditDetails } from '../types';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Approved': return 'text-green-400 bg-green-500/10 border-green-500/20';
    case 'In Review': return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
    case 'Completed': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
    default: return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
  }
};

export const ClientProjectBreakdown = ({ projects }: { projects: ProjectCreditDetails[] }) => {
  return (
    <div className="bg-[#0e0f13]/50 p-4 border-t border-white/5">
      <div className="rounded-xl overflow-hidden border border-white/5">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-[10px] uppercase text-slate-500 font-bold">
            <tr>
              <th className="px-4 py-2">Project</th>
              <th className="px-4 py-2">Last Active</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2 text-right">Credits</th>
            </tr>
          </thead>
          <tbody className="text-xs text-slate-300 divide-y divide-white/5">
            {projects.map(p => (
              <tr key={p.id} className="hover:bg-white/5 transition-colors">
                <td className="px-4 py-3 font-medium text-white">{p.name}</td>
                <td className="px-4 py-3 text-slate-500">{p.lastActive}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getStatusColor(p.status)}`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right font-mono font-bold text-cyan-400">
                  {p.credits}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
