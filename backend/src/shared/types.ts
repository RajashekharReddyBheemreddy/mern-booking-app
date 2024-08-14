export type HotelType = {
    _id: string;
    userId: string;
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    adultCount: number;
    childCount: number;
    facilities: string[];
    starRating: number;
    imageUrls: string[];
    lastUpdated: Date;
    pricePerNight:number;
    bookings: BookingType[];
};

export type HotelSearchResponse = {
    data: HotelType[];
    pagination:{
        total: number;
        page: number;
        pages: number;
    }
}
export type PaymentIntentResponse = {
    paymentIntentid: String;
    clientSecret: String;
    totalCost: number;
}
export type BookingType = {
    _id?: string;
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    adultCount: number;
    childCount: number;
    checkIn: Date;
    checkOut: Date;
    totalCost: number;
}