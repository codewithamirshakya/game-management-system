export interface createUserArpStudio {
    username: string;
    nickname: string
}

export interface saveUserArpStudio {
    id: number;
    username: string;
    nickname: string;
    state: number;
    open_url: string;
    created_at: Date;
    updated_at: Date
}