import { Profile } from "./profile.domain";

export interface Friend extends Profile {
    isFriend: boolean;
}