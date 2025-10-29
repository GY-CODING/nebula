import { Profile } from "./profile.domain";

export interface Friend extends Profile {
    isFriend: boolean;
}

export interface FriendRequest{
    id: string;
    from: string;
    to: string;
}