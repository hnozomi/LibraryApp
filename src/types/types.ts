export type UserType = {
    username: string;
    icon: string;
    role: string
}

export type AchievementType = {
    user_id: string;
    book_id: string
}

export type BookType = {
    title: string;
    author: string;
    category: string;
    image_url: string
}

export type ReservationType = {
    user_id: string;
    book_id: string;
    start_day: Date;
    end_day: Date
} 

export type ReviewType = {
    rate: number;
    memo: string;
    user_id: string;
    book_id: string
}