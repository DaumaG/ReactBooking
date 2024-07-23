export interface BookingCreateRequest {
    businessId: string;
    businessName: string;
    date: Date;
    time: string;
    userEmail: string;
    userName: string;
    status: string;
}

export interface Booking {
    businessId: string;
    date: Date;
    time: string;
    userEmail: string;
    userName: string;
    status: string;
}
  