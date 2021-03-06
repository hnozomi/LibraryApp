export type UserType = {
    documentId: string
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
    review: Array<ReviewType>,
    reservations: Array<ReservationType>
}

export type NewBookType = Omit<BookType, "book_id" | "review" | "reservations">;

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

export type ReviewType = {
    review_id: string
    rate: number;
    text: string;
    user_id: string;
}

export type Result = {
    status: "success" | "error";
    message: string;
  };
  

export type DateType = {
    start: string,
    end: string
}

export type FormNotification = {
    open: boolean;
    status: string | undefined;
    message: string | undefined;
  };

export type Rare = number | null;

export type LocationState = {
  book_id?: string;
  reviews_id?: string;
  review_user_id?: string;
  rate?: number;
  text?: string;
};