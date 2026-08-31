export interface RoomDetails {
  roomNumber: string;
  type: string;
  accessibility: string;
  price: string;
  amenities?: {
    wifi?: boolean;
    tv?: boolean;
    radio?: boolean;
    refreshments?: boolean;
    safe?: boolean;
    views?: boolean;
  };
}
