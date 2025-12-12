
export type ExportFormat = 'JPG' | 'PNG' | 'WEBP' | 'TIFF';
export type ExportResolution = '1x' | '2x' | '4k';

export interface ExportSettings {
  format: ExportFormat;
  size: ExportResolution;
  quality: number;
}

export interface ExportConfigPro {
  format: ExportFormat;
  resolution: ExportResolution;
  quality: number;
  keepMetadata: boolean;
  removeWatermark: boolean;
  colorProfile: 'sRGB' | 'AdobeRGB' | 'P3';
}

export interface ExportHistoryItem {
  id: string;
  thumbnail: string;
  filename: string;
  format: ExportFormat;
  size: string;
  date: string;
}
