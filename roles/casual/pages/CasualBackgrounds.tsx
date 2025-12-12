
import React, { useState, useMemo } from 'react';
import { DashboardLayout } from '../../../features/dashboard/components/DashboardLayout';
import { Icons } from '../../../shared/components/Icons';
import { MOCK_BACKGROUND_PACKS, BACKGROUND_CATEGORIES } from '../../../services/mock/backgrounds';
import { BackgroundPack, BackgroundItem } from '../../../features/backgrounds/types';
import { 
  FeaturedPackBanner, 
  BackgroundPackCard, 
  BackgroundUpsellBanner 
} from '../../../features/backgrounds/components/BackgroundUI';
import { BackgroundPackDetailModal } from '../../../features/backgrounds/components/BackgroundModals';

// --- ADAPTIVE LOCAL COMPONENTS ---
const AdaptiveFilterPill: React.FC<{ label: string, isActive: boolean, onClick: () => void }> = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`
      whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium border transition-all duration-300
      ${isActive 
        ? 'bg-violet-100 dark:bg-violet-600 border-violet-200 dark:border-violet-500 text-violet-700 dark:text-white shadow-sm' 
        : 'bg-white dark:bg-[#1a1b26] border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:border-slate-300 dark:hover:border-white/20 hover:text-slate-800 dark:hover:text-white'
      }
    `}
  >
    {label}
  </button>
);

const AdaptiveSearchBar = ({ value, onChange }: { value: string, onChange: (v: string) => void }) => (
  <div className="relative w-full max-w-md group">
    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-violet-500 dark:group-focus-within:text-violet-400 transition-colors">
      <Icons.Search className="w-5 h-5" />
    </div>
    <input 
      type="text" 
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search backgrounds..."
      className="
        w-full pl-10 pr-4 py-3 rounded-xl 
        bg-white dark:bg-[#1a1b26] 
        border border-slate-200 dark:border-white/10
        text-slate-900 dark:text-white placeholder-slate-400 
        outline-none transition-all duration-300
        focus:border-violet-500 dark:focus:border-violet-500 
        focus:shadow-md focus:shadow-violet-100 dark:focus:shadow-none
      "
    />
  </div>
);

// Helper to get diverse aspect ratios for "sole" (masonry) look
const getAspectRatioClass = (index: number) => {
  const ratios = [
    'aspect-[4/5]', // Standard vertical
    'aspect-[1/1]', // Square
    'aspect-[3/5]', // Tall
    'aspect-[4/5]',
    'aspect-[4/4]', // Square
  ];
  return ratios[index % ratios.length];
};

export const CasualBackgrounds = ({ onLogout, onNavigate, user }: { onLogout: () => void, onNavigate: (path: string) => void, user: any }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPack, setSelectedPack] = useState<BackgroundPack | null>(null);

  // --- FILTER LOGIC ---
  const filteredPacks = useMemo(() => {
    return MOCK_BACKGROUND_PACKS.filter(pack => {
      const matchesCategory = activeCategory === 'All' || pack.category === activeCategory;
      const matchesSearch = pack.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            pack.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // --- HANDLERS ---
  const handleOpenPack = (pack: BackgroundPack) => {
    setSelectedPack(pack);
  };

  const handleUseBackground = (item: BackgroundItem) => {
    console.log("Using background:", item.title);
    setSelectedPack(null);
    onNavigate('editor');
  };

  return (
    <DashboardLayout user={user} onLogout={onLogout} onNavigate={onNavigate} activePage="backgrounds">
      
        {/* 1. HEADER & SEARCH */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-bold mb-2 text-slate-900 dark:text-white">
              Background Packs
            </h1>
            <p className="text-slate-500 dark:text-slate-400">High-quality scenes for your art.</p>
          </div>
          <AdaptiveSearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        {/* 2. FILTER BAR */}
        <div className="py-4 mb-8 -mx-6 px-6 border-b border-slate-200 dark:border-white/5 flex gap-3 overflow-x-auto no-scrollbar">
           {BACKGROUND_CATEGORIES.map(cat => (
             <AdaptiveFilterPill 
               key={cat} 
               label={cat} 
               isActive={activeCategory === cat} 
               onClick={() => setActiveCategory(cat)} 
             />
           ))}
        </div>

        {/* 3. FEATURED BANNER */}
        {activeCategory === 'All' && !searchQuery && (
          <FeaturedPackBanner />
        )}

        {/* 4. MASONRY GRID (Sole Layout) */}
        {filteredPacks.length > 0 ? (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {filteredPacks.map((pack, idx) => (
              <BackgroundPackCard 
                key={pack.id} 
                pack={pack} 
                index={idx}
                className={getAspectRatioClass(idx)} // Inject random height
                onClick={() => handleOpenPack(pack)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 opacity-60">
            <div className="p-4 rounded-full bg-slate-200 dark:bg-white/10 mb-4">
              <Icons.Image className="w-10 h-10 text-slate-500 dark:text-slate-400" />
            </div>
            <p className="text-xl font-medium text-slate-500 dark:text-slate-400">No background packs found.</p>
            <button 
              onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
              className="mt-2 text-violet-600 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-300 font-medium"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* 5. UPSELL */}
        <BackgroundUpsellBanner />

      {/* --- MODAL --- */}
      <BackgroundPackDetailModal 
        isOpen={!!selectedPack}
        onClose={() => setSelectedPack(null)}
        pack={selectedPack}
        onUse={handleUseBackground}
      />
      
    </DashboardLayout>
  );
};
