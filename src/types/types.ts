export type UserType = {
    user_id: string
    username: string;
    icon: string;
    role: string
}

export type AchievementType = {
    achievement_id: string
    user_id: string;
    book_id: string
}

export type BookType = {
    book_id: string
    title: string;
    author: string;
    category: string | [];
    image_url: string;
    review: [],
    reservations: Array<ReservationType>
}

export type NewBookType = Omit<BookType, "book_id" | "review" | "reservations">;

export type ReservationType = {
    reservation_id: string
    user_id: string;
    book_id: string;
    start_day: Date;
    end_day: Date
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

export type ReviewType = {
    review_id: string
    rate: number;
    memo: string;
    user_id: string;
    book_id: string
}

export type Result = {
    status: string;
    message: string;
  };
  