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