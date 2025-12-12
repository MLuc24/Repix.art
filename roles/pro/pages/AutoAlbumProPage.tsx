
import React, { useState, useMemo } from 'react';
import { DashboardLayout } from '../../../features/dashboard/components/DashboardLayout';
import { MOCK_PRO_USER } from '../../../services/mock/dashboard';
import { MOCK_PRO_ALBUMS, MOCK_FACES } from '../../../services/mock/auto_album';
import { ProAlbum, ClusterType } from '../../../features/auto-album/types';
import { AlbumCardPro } from '../../../features/auto-album/components/AlbumCardPro';
import { FaceClusterPanel } from '../../../features/auto-album/components/FaceClusterPanel';
import { AlbumDetailPro } from '../../../features/auto-album/components/AlbumDetailPro';
import { ProRefineModal } from '../../../features/auto-album/components/ProRefineModal';
import { Icons } from '../../../shared/components/Icons';

export const AutoAlbumProPage = ({ onLogout, onNavigate }: { onLogout: () => void, onNavigate: (path: string) => void }) => {
  const [activeTab, setActiveTab] = useState<ClusterType | 'All'>('All');
  const [selectedAlbum, setSelectedAlbum] = useState<ProAlbum | null>(null);
  const [activeFaceFilter, setActiveFaceFilter] = useState<string | null>(null);
  const [showRefineModal, setShowRefineModal] = useState(false);

  // --- FILTER LOGIC ---
  const filteredAlbums = useMemo(() => {
    let result = MOCK_PRO_ALBUMS;

    // 1. Tab Filter
    if (activeTab !== 'All') {
      result = result.filter(alb => alb.type === activeTab);
    }

    // 2. Face Filter
    if (activeTab === 'Face' && activeFaceFilter) {
      const face = MOCK_FACES.find(f => f.id === activeFaceFilter);
      if (face) {
        // Mock check: in reality, check ID. Here checking if avatar URL is in album faces
        result = result.filter(alb => alb.faces?.includes(face.avatar));
      }
    }

    return result;
  }, [activeTab, activeFaceFilter]);

  // --- HANDLERS ---
  const handleRefineConfirm = () => {
    // Logic to subtract credit and refine
    setShowRefineModal(false);
    console.log("Refinement started...");
  };

  // --- RENDER: DETAIL VIEW ---
  if (selectedAlbum) {
    return (
      <DashboardLayout user={MOCK_PRO_USER} onLogout={onLogout} onNavigate={onNavigate} activePage="upload">
         <AlbumDetailPro 
           album={selectedAlbum} 
           onBack={() => setSelectedAlbum(null)}
           onRefine={() => setShowRefineModal(true)}
           onNavigate={onNavigate}
         />
         <ProRefineModal 
           isOpen={showRefineModal}
           onClose={() => setShowRefineModal(false)}
           onConfirm={handleRefineConfirm}
         />
      </DashboardLayout>
    );
  }

  // --- RENDER: LIST VIEW ---
  return (
    <DashboardLayout user={MOCK_PRO_USER} onLogout={onLogout} onNavigate={onNavigate} activePage="upload">
      <div className="min-h-screen bg-slate-50 dark:bg-[#0e0f13] transition-colors">
        
        {/* Header */}
        <div className="px-6 py-8">
           <div className="flex items-center justify-between mb-6">
              <div>
                 <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Auto Albums</h1>
                 <p className="text-slate-500 text-sm">AI organized collections from your uploads.</p>
              </div>
              <button 
                onClick={() => onNavigate('upload')}
                className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-sm font-bold transition-colors shadow-lg"
              >
                <Icons.Upload className="w-4 h-4" /> Import More
              </button>
           </div>

           {/* Tabs */}
           <div className="flex gap-2 border-b border-slate-200 dark:border-white/5 pb-1">
              {['All', 'Face', 'Location', 'Concept'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => { setActiveTab(tab as any); setActiveFaceFilter(null); }}
                  className={`
                    px-6 py-3 text-sm font-bold border-b-2 transition-all
                    ${activeTab === tab ? 'text-violet-600 dark:text-white border-violet-600 dark:border-violet-500' : 'text-slate-500 border-transparent hover:text-slate-800 dark:hover:text-slate-300'}
                  `}
                >
                  {tab}s
                </button>
              ))}
           </div>
        </div>

        {/* Face Panel (Conditional) */}
        {activeTab === 'Face' && (
          <FaceClusterPanel 
            faces={MOCK_FACES} 
            activeFaceId={activeFaceFilter} 
            onSelectFace={setActiveFaceFilter}
          />
        )}

        {/* Grid */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
           {filteredAlbums.map((album, idx) => (
             <AlbumCardPro 
               key={album.id}
               album={album}
               index={idx}
               onClick={() => setSelectedAlbum(album)}
             />
           ))}
           
           {filteredAlbums.length === 0 && (
             <div className="col-span-full py-20 text-center opacity-50">
                <Icons.Search className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-500 font-bold">No albums found</p>
             </div>
           )}
        </div>

      </div>
    </DashboardLayout>
  );
};
