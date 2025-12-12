
import React, { useState, useMemo, useRef } from 'react';
import { DashboardLayout } from '../../dashboard/components/DashboardLayout';
import { Icons } from '../../../shared/components/Icons';
import { MOCK_TEMPLATES, TEMPLATE_CATEGORIES } from '../../../services/mock/templates';
import { Template } from '../types';
import { 
  TemplateCard, 
  TemplateHero,
  FilterPill,
  SearchBar
} from '../components/TemplateUI';
import { 
  ApplyTemplateModal, 
  TemplatePreviewModal 
} from '../components/TemplateModals';

// Helper for "Sole" (Masonry) Layout - Prioritizing Vertical Rectangles
const getAspectRatioClass = (index: number) => {
  const ratios = [
    'aspect-[3/4]',  // Standard Vertical
    'aspect-[9/16]', // Tall/Story (Creates the "sole" effect)
    'aspect-[2/3]',  // Classic Photo
    'aspect-[3/4]',  // Repeat Standard
    'aspect-[4/5]',  // Instagram Portrait
  ];
  return ratios[index % ratios.length];
};

export const ProMarketplace = ({ onLogout, onNavigate, user }: { onLogout: () => void, onNavigate: (path: string) => void, user: any }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [applyingTemplate, setApplyingTemplate] = useState<Template | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // --- FILTER LOGIC ---
  const filteredTemplates = useMemo(() => {
    return MOCK_TEMPLATES.filter(t => {
      const matchesCategory = activeCategory === 'All' || t.category === activeCategory;
      const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            t.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // --- HANDLERS ---
  const handleUseTemplate = (t: Template) => {
    setPreviewTemplate(null);
    setApplyingTemplate(t);
  };

  const confirmApply = () => {
    setApplyingTemplate(null);
    onNavigate('editor');
  };

  const handleViewPack = () => {
    setActiveCategory('Trending');
    if (gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handlePreviewAll = () => {
    if (filteredTemplates.length > 0) {
      setPreviewTemplate(filteredTemplates[0]);
    }
  };

  return (
    <DashboardLayout user={user} onLogout={onLogout} onNavigate={onNavigate} activePage="marketplace">
      <div className="max-w-screen-xl mx-auto pb-20">
        
        {/* 1. HEADER PAGE */}
        <div className="mb-8 mt-2 px-1">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">
            Pro Templates
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg">Premium scenes & layouts for your projects.</p>
        </div>

        {/* 2. CONTROLS ROW (Sticky) */}
        <div className="sticky top-0 z-40 bg-slate-50/90 dark:bg-[#020617]/90 backdrop-blur-xl py-4 mb-8 -mx-4 px-4 md:-mx-8 md:px-8 border-b border-transparent transition-all">
           <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-screen-xl mx-auto">
              
              {/* Filter Bar */}
              <div className="flex gap-2 overflow-x-auto no-scrollbar w-full md:w-auto pb-1">
                 {TEMPLATE_CATEGORIES.map(cat => (
                   <FilterPill 
                     key={cat} 
                     label={cat} 
                     isActive={activeCategory === cat} 
                     onClick={() => setActiveCategory(cat)} 
                   />
                 ))}
              </div>

              {/* Search Bar */}
              <div className="w-full md:w-72 lg:w-80">
                 <SearchBar value={searchQuery} onChange={setSearchQuery} />
              </div>
           </div>
        </div>

        {/* 3. FEATURED PACK HERO */}
        {activeCategory === 'All' && !searchQuery && (
           <div className="mb-12">
             <TemplateHero 
               onViewPack={handleViewPack}
               onPreviewAll={handlePreviewAll}
             />
           </div>
        )}

        {/* 4. GRID PACK LIST (Masonry using Columns) */}
        <div ref={gridRef}>
          {filteredTemplates.length > 0 ? (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 px-1">
              {filteredTemplates.map((template, idx) => (
                <TemplateCard 
                  key={template.id} 
                  template={template} 
                  index={idx}
                  className={getAspectRatioClass(idx)}
                  onPreview={setPreviewTemplate}
                  onUse={handleUseTemplate}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-32 opacity-60">
              <div className="p-6 rounded-full bg-slate-200 dark:bg-white/5 mb-4">
                <Icons.Search className="w-10 h-10 text-slate-500 dark:text-slate-400" />
              </div>
              <p className="text-xl font-bold text-slate-500 dark:text-slate-400">No templates found.</p>
              <button 
                onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
                className="mt-3 text-violet-600 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-300 font-medium"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

      </div>

      {/* --- MODALS --- */}
      <TemplatePreviewModal 
        isOpen={!!previewTemplate} 
        onClose={() => setPreviewTemplate(null)}
        template={previewTemplate}
        onUse={handleUseTemplate}
        onSelectSimilar={setPreviewTemplate}
      />

      <ApplyTemplateModal 
        isOpen={!!applyingTemplate}
        onClose={() => setApplyingTemplate(null)}
        template={applyingTemplate}
        onConfirm={confirmApply}
      />
      
    </DashboardLayout>
  );
};
