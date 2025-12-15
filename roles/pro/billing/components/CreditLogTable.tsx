
import React from 'react';
import { CreditTransaction } from '../../../../features/credits-log/types';
import { Icons } from '../../../../shared/components/Icons';

const getCategoryBadge = (cat: string) => {
  switch(cat) {
    case 'export_hd': return <span className="text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">Export</span>;
    case 'ai_tools': return <span className="text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded border border-violet-500/20">Generator</span>;
    case 'credits_added': return <span className="text-green-400 bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">Top Up</span>;
    default: return <span className="text-slate-400 bg-white/5 px-2 py-0.5 rounded">System</span>;
  }
};

export const CreditLogTable = ({ transactions }: { transactions: CreditTransaction[] }) => {
  return (
    <div className="bg-white dark:bg-[#1a1b26] border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden shadow-sm dark:shadow-none">
      <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-white/5">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">Recent Activity</h3>
        <button className="text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1">
          <Icons.Download className="w-3 h-3" /> Export CSV
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-50 dark:bg-black/20">
              <th className="p-4">Date</th>
              <th className="p-4">Action</th>
              <th className="p-4">Category</th>
              <th className="p-4 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {transactions.map((tx) => (
              <tr key={tx.id} className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                <td className="p-4 text-slate-500 dark:text-slate-400 whitespace-nowrap font-mono">
                  {new Date(tx.timestamp).toLocaleDateString()} <span className="opacity-50">{new Date(tx.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                </td>
                <td className="p-4">
                  <p className="text-slate-900 dark:text-slate-200 font-bold">{tx.description}</p>
                  {tx.metadata && <p className="text-[10px] text-slate-500 mt-0.5 group-hover:text-slate-600 dark:group-hover:text-slate-400">{tx.metadata}</p>}
                </td>
                <td className="p-4 text-[10px] font-bold uppercase tracking-wider">
                  {getCategoryBadge(tx.category)}
                </td>
                <td className={`p-4 text-right font-mono font-bold ${tx.amount > 0 ? 'text-green-600 dark:text-green-400' : 'text-slate-600 dark:text-slate-200'}`}>
                  {tx.amount > 0 ? '+' : ''}{tx.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-3 text-center bg-slate-50 dark:bg-black/20 border-t border-slate-200 dark:border-white/5">
        <button className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">Load older records</button>
      </div>
    </div>
  );
};
