
export enum RentalStatus {
  AVAILABLE = 'Available',
  RENTED = 'Rented',
}

export interface InventoryItem {
  id: string;
  name: string;
  userDescription: string;
  aiDescription: string;
  pricePerDay: number;
  imageUrl: string;
  status: RentalStatus;
}
