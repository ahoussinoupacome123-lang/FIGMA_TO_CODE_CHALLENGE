export type BloodLevel = 'critique' | 'faible' | 'suffisant' | 'optimal';

export interface BloodReserve {
  group: string;
  percentage: number;
  daysOfReserve: number;
  level: BloodLevel;
}

export const bloodReserves: BloodReserve[] = [
  { group: 'A+', percentage: 62, daysOfReserve: 5, level: 'suffisant' },
  { group: 'A-', percentage: 28, daysOfReserve: 2, level: 'critique' },
  { group: 'B+', percentage: 55, daysOfReserve: 4, level: 'faible' },
  { group: 'B-', percentage: 18, daysOfReserve: 1, level: 'critique' },
  { group: 'AB+', percentage: 45, daysOfReserve: 4, level: 'faible' },
  { group: 'AB-', percentage: 22, daysOfReserve: 2, level: 'critique' },
  { group: 'O+', percentage: 78, daysOfReserve: 7, level: 'optimal' },
  { group: 'O-', percentage: 35, daysOfReserve: 3, level: 'faible' },
];

export function getLevelColor(level: BloodLevel): string {
  const colors: Record<BloodLevel, string> = {
    critique: '#DC2626',
    faible: '#F97316',
    suffisant: '#D97706',
    optimal: '#059669',
  };
  return colors[level];
}

export function getLevelLabel(level: BloodLevel): string {
  const labels: Record<BloodLevel, string> = {
    critique: 'Critique',
    faible: 'Faible',
    suffisant: 'Suffisant',
    optimal: 'Optimal',
  };
  return labels[level];
}
