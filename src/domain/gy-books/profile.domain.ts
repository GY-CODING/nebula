export interface ActivityItem {
    id: string;
    message: string;
}

export interface HallOfFame {
    books: string[];
    quote: string;
}

export interface Profile {
    id: string;
    username: string;
    phoneNumber: string;
    picture: string;
    email: string;
    biography: string;
    hallOfFame: HallOfFame;
    activity: ActivityItem[];
}