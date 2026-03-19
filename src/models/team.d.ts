import type {UserType} from "./user";

/**
 * 队伍类别
 */
export type TeamType = {
    id: number;
    "description": string,
    "expireTime"?:  string[3],
    "maxNum": number,
    "name": string,
    "password"?: "",
    "status": number,
    createTime: Date;
    updateTime: Date;
    createUser: UserType;
};
