export interface Thread {
    _id: string;
    userIds: [string, string];
    chat: Array<Chat>;
}

export interface Chat {
    timestamp: number;
    message: string;
    userId: string;
}

export interface ThreadForPost {
    userIds: [string, string];
    chat: Array<ChatForPost>;
}

export interface ChatForPost {
    message: string;
    userId: string;
}