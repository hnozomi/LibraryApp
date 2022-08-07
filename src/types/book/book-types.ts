import { ReviewType, ReservationType } from "@/types";

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