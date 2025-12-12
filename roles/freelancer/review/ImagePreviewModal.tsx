
import React from 'react';
import { Icons } from '../../../shared/components/Icons';
import { ReviewAsset, ReviewComment } from '../../../services/mock/review';
import { CommentPanel } from './CommentPanel';

interface ImagePreviewModalProps {
  asset: ReviewAsset | null;
  isOpen: boolean;
  onClose: () => void;
  comments: ReviewComment[];
  onAddComment: (text: string) => void;
  onSetStatus: (status: ReviewAsset['status']) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const ImagePreviewModal = ({ asset, isOpen, onClose, comments, onAddComment, onSetStatus, onNext, onPrev }: ImagePreviewModalProps) => {
  if (!isOpen || !asset) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm animate-fade-in-up">
      
      {/* Main Container */}
      <div className="relative w-full h-full flex flex-col lg:flex-row">
        
        {/* LEFT: IMAGE CANVAS */}
        <div className="flex-1 relative flex flex-col h-full bg-[#050507]">
           {/* Top Bar */}
           <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-20 bg-gradient-to-b from-black/60 to-transparent">
              <h3 className="text-white font-bold drop-shadow-md">{asset.name}</h3>
              <div className="flex gap-2">
                 <button onClick={onClose} className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md">
                   <Icons.Close className="w-5 h-5" />
                 </button>
              </div>
           </div>

           {/* Navigation */}
           <button onClick={onPrev} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white backdrop-blur-md transition-all group">
              <Icons.ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
           </button>
           <button onClick={onNext} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white backdrop-blur-md transition-all group">
              <Icons.ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
           </button>

           {/* Image */}
           <div className="flex-1 flex items-center justify-center p-4 lg:p-12 overflow-hidden">
              <img src={asset.src} alt={asset.name} className="max-w-full max-h-full object-contain shadow-2xl" />
           </div>

           {/* Bottom Actions */}
           <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-4 p-2 bg-[#1a1b26]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl">
              <button 
                onClick={() => onSetStatus('approved')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${asset.status === 'approved' ? 'bg-green-500 text-white' : 'hover:bg-white/10 text-slate-300'}`}
              >
                <Icons.Check className="w-4 h-4" /> Approve
              </button>
              <button 
                onClick={() => onSetStatus('rejected')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${asset.status === 'rejected' ? 'bg-red-500 text-white' : 'hover:bg-white/10 text-slate-300'}`}
              >
                <Icons.Close className="w-4 h-4" /> Reject
              </button>
           </div>
        </div>

        {/* RIGHT: COMMENT PANEL (Sidebar on Desktop, Bottom Sheet on Mobile could be implemented, keeping simple sidebar for now) */}
        <div className="w-full lg:w-96 h-[40vh] lg:h-full border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col z-30 shadow-2xl">
           <div className="bg-[#131418] px-4 py-3 border-b border-white/5 flex items-center gap-2">
              <Icons.FileText className="w-4 h-4 text-slate-400" />
              <span className="text-sm font-bold text-white">Comments</span>
           </div>
           <CommentPanel 
             comments={comments} 
             onAddComment={onAddComment}
           />
        </div>

      </div>
    </div>
  );
};
