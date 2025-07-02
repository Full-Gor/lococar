export interface Car {
  id: number;
  name: string;
  brand: string;
  image: string;
  pollutionQuota: string;
  pricePerMonth: number;
  category: 'standard' | 'electric' | 'used';
  description: string;
}