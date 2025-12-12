
export interface DeliveryPreset {
  id: string;
  name: string;
  description: string;
  formats: string[];
  multiplier: number; // Credit cost multiplier per image
  iconType: 'social' | 'web' | 'print' | 'source';
}

export interface DeliveryConfig {
  presetId: string;
  removeWatermark: boolean;
  zipPackage: boolean;
  customNaming: string;
}

export interface DeliveryAsset {
  id: string;
  src: string;
  name: string;
  status: 'Approved' | 'In Review' | 'Draft';
  isSelected: boolean;
}
