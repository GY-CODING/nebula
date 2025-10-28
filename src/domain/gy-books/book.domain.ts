export interface Book{
    id: string;
    averageRating: number;
    userData?: UserData;
}

export interface UserData{
    profileId: string;
    status: EBookStatus;
    rating: number;
    progress: number;
    startDate: string;
    endDate: string;
}

export enum EBookStatus{
    READING = "READING",
    WANT_TO_READ = "WANT_TO_READ",
    READ = "READ"
}