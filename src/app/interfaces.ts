export interface IUser {
    level: number;
    username: string;
    password: string;
    valid: boolean;
    groups: string[];
    dp: string;
    email?: string;
}

export interface INetResponse {
    success: boolean;
    message: string | null;
    user?: IUser;
}
