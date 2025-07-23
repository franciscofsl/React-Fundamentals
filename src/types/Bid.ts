export interface Bid {
  id?: number | string;
  houseId: number;
  bidder: string;
  amount: number;
  timestamp?: string;
}
