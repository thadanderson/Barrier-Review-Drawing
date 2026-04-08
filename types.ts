
export interface RouletteItem {
  id: string;
  label: string; // e.g., "Etude 1" or "Single Stroke Roll"
  source: string; // e.g., "Portraits in Rhythm" or "Roll Rudiments"
  tempo?: string; // e.g., "quarter = 80"
}

export interface RouletteResult {
  item: RouletteItem;
  timestamp: number;
  advice?: string;
}

export type CategoryMap = Record<string, RouletteItem[]>;
export type LevelMap = Record<string, CategoryMap>;
