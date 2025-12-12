
export type PresetCategory = 'All' | 'Portrait' | 'Product' | 'Social' | 'Cinematic' | 'Custom';

export interface PresetSettingsSnapshot {
  adjustments: boolean;
  filters: boolean;
  masks: boolean;
  remix: boolean;
}

export interface Preset {
  id: string;
  name: string;
  category: PresetCategory;
  thumbnail: string;
  isPro: boolean;
  isCustom: boolean; // Created by user
  settings: PresetSettingsSnapshot; // What does this preset effect?
  createdAt: string;
}
