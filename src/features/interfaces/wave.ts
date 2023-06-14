export interface ChartPoint {
  id: number;
  x: string;
  y: number; 
}

export interface ChartBreak {  
  startValue: string;
  endValue: string; 
}

export interface Wave {
  id: string;
  type: string; 
  scale: string;
  points: ChartPoint [];
  headerWave_id?: string;
  entetyState: 'New' | 'Persistent' | 'Detached';
}