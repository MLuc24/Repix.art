
import React, { useState } from 'react';
import { ClientCreditSummary } from '../types';
import { Icons } from '../../../../shared/components/Icons';
import { ClientProjectBreakdown } from './ClientProjectBreakdown';

export const ClientCreditTable = ({ data }: { data: ClientCreditSummary[] }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <div className="bg-[#1a1b26] border border-white/5 rounded-2xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-white/5">
              <th className="p-4 w-10"></th>
              <th className="p-4">Client</th>
              <th className="p-4 text-center">Projects</th>
              <th className="p-4 text-right">Credits Used</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {data.map((client) => {
              const isExpanded = expandedId === client.id;
              
              return (
                <React.Fragment key={client.id}>
                  <tr 
                    onClick={() => toggleExpand(client.id)}
                    className={`cursor-pointer transition-colors ${isExpanded ? 'bg-white/5' : 'hover:bg-white/5'} border-b border-white/5`}
                  >
                    <td className="p-4 text-slate-500">
                      <Icons.ChevronLeft className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? '-rotate-90 text-cyan-400' : 'rotate-180'}`} />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={client.avatar} alt={client.name} className="w-8 h-8 rounded-full border border-white/10" />
                        <span className={`font-bold ${isExpanded ? 'text-white' : 'text-slate-200'}`}>
                          {client.name}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <span className="bg-white/10 px-2 py-1 rounded text-xs text-slate-300 font-mono">
                        {client.totalProjects}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <span className="text-lg font-bold text-cyan-400">{client.totalCredits}</span>
                    </td>
                  </tr>
                  
                  {isExpanded && (
                    <tr>
                      <td colSpan={4} className="p-0">
                        <ClientProjectBreakdown projects={client.projects} />
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
