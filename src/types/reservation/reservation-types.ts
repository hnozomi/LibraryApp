export type ReservationType = {
    reservation_id: string
    user_id: string;
    book_id: string;
    start_day: string;
    end_day: string
} 

export type DeleteReservationType = Omit<ReservationType, "start_day" | "end_day">

export type BookReservationType = {
    reservation_id: string
    user_id: string;
    book_id: string;
    start_day: Date;
    end_day: Date
    title: string;
    author: string;
    category: string;
    image_url: string;
    review: []
}

export type ReservationDate = {
    start: string;
    end: string;
  };