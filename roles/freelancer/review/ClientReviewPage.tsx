
import React, { useState, useEffect } from 'react';
import { MOCK_REVIEW_SESSION, MOCK_ASSET_COMMENTS, ReviewAsset, ReviewComment } from '../../../services/mock/review';
import { ReviewHeader } from './ReviewHeader';
import { ReviewImageGrid } from './ReviewImageGrid';
import { ImagePreviewModal } from './ImagePreviewModal';
import { ApproveConfirmModal } from './ApproveConfirmModal';
import { RequestChangesModal } from './RequestChangesModal';
import { Icons } from '../../../shared/components/Icons';

export const ClientReviewPage = ({ onNavigate }: { onNavigate: (path: string) => void }) => {
  const [session, setSession] = useState(MOCK_REVIEW_SESSION);
  const [activeAsset, setActiveAsset] = useState<ReviewAsset | null>(null);
  const [commentsMap, setCommentsMap] = useState(MOCK_ASSET_COMMENTS);
  
  // Modal States
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);

  // --- HANDLERS ---

  const handleOpenAsset = (asset: ReviewAsset) => {
    setActiveAsset(asset);
  };

  const handleAddComment = (text: string) => {
    if (!activeAsset) return;
    
    const newComment: ReviewComment = {
      id: `nc_${Date.now()}`,
      author: 'Client', // Mocking client identity
      text: text,
      timestamp: 'Just now'
    };

    setCommentsMap(prev => ({
      ...prev,
      [activeAsset.id]: [...(prev[activeAsset.id] || []), newComment]
    }));

    // Update session asset comment count
    setSession(prev => ({
      ...prev,
      assets: prev.assets.map(a => a.id === activeAsset.id ? { ...a, commentCount: a.commentCount + 1 } : a)
    }));
  };

  const handleSetAssetStatus = (status: ReviewAsset['status']) => {
    if (!activeAsset) return;
    
    setSession(prev => ({
      ...prev,
      assets: prev.assets.map(a => a.id === activeAsset.id ? { ...a, status } : a)
    }));
    
    // Auto-advance logic could go here
    if (status === 'approved') {
       // Optional: Move to next
    }
  };

  const handleNavAsset = (dir: 'next' | 'prev') => {
    if (!activeAsset) return;
    const idx = session.assets.findIndex(a => a.id === activeAsset.id);
    if (dir === 'next' && idx < session.assets.length - 1) setActiveAsset(session.assets[idx + 1]);
    if (dir === 'prev' && idx > 0) setActiveAsset(session.assets[idx - 1]);
  };

  const handleProjectApprove = () => {
    setSession(prev => ({ ...prev, status: 'Approved' }));
    setShowApproveModal(false);
    // In real app, trigger API
  };

  const handleRequestChanges = (feedback: string) => {
    setSession(prev => ({ ...prev, status: 'Changes Requested' }));
    setShowRequestModal(false);
    // In real app, trigger API
  };

  // --- PROJECT COMMENT (Bottom) ---
  const [projectComment, setProjectComment] = useState('');
  const handleProjectCommentSubmit = () => {
     if(!projectComment.trim()) return;
     // Add to project-level comments (mock)
     alert('Comment sent to freelancer!');
     setProjectComment('');
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans pb-20">
      
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
         <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-cyan-900/10 rounded-full blur-[100px]" />
         <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[100px]" />
      </div>

      <ReviewHeader 
        session={session} 
        onApprove={() => setShowApproveModal(true)}
        onRequestChanges={() => setShowRequestModal(true)}
      />

      <main className="relative z-10 max-w-7xl mx-auto">
         
         <div className="text-center py-10">
            <h2 className="text-3xl font-bold text-white mb-2">Review Assets</h2>
            <p className="text-slate-400">Click on an image to view details and leave comments.</p>
         </div>

         <ReviewImageGrid 
           assets={session.assets} 
           onOpenAsset={handleOpenAsset}
         />

         {/* Project Level Feedback */}
         <div className="max-w-2xl mx-auto mt-12 px-6">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Overall Feedback</h3>
            <div className="bg-[#1a1b26] border border-white/10 rounded-2xl p-2 relative group focus-within:border-cyan-500/50 transition-colors">
               <textarea 
                 value={projectComment}
                 onChange={(e) => setProjectComment(e.target.value)}
                 className="w-full h-32 bg-transparent text-white p-4 resize-none outline-none placeholder-slate-600 text-sm"
                 placeholder="Any general thoughts about the project?"
               />
               <div className="flex justify-end p-2">
                  <button 
                    onClick={handleProjectCommentSubmit}
                    disabled={!projectComment.trim()}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-colors"
                  >
                    Send Feedback
                  </button>
               </div>
            </div>
         </div>

      </main>

      {/* MODALS */}
      <ImagePreviewModal 
        isOpen={!!activeAsset}
        asset={activeAsset}
        onClose={() => setActiveAsset(null)}
        comments={activeAsset ? (commentsMap[activeAsset.id] || []) : []}
        onAddComment={handleAddComment}
        onSetStatus={handleSetAssetStatus}
        onNext={() => handleNavAsset('next')}
        onPrev={() => handleNavAsset('prev')}
      />

      <ApproveConfirmModal 
        isOpen={showApproveModal}
        onClose={() => setShowApproveModal(false)}
        onConfirm={handleProjectApprove}
      />

      <RequestChangesModal 
        isOpen={showRequestModal}
        onClose={() => setShowRequestModal(false)}
        onSubmit={handleRequestChanges}
      />

      {/* SIMULATED CLIENT EXIT (Dev only) */}
      <button 
        onClick={() => onNavigate('projects')} 
        className="fixed bottom-4 left-4 px-3 py-1 bg-red-900/50 text-red-200 text-xs rounded border border-red-500/30 opacity-50 hover:opacity-100 transition-opacity z-50"
      >
        Exit Client Mode
      </button>

    </div>
  );
};
