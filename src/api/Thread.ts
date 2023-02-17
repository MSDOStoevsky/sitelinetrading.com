export interface Thread {
    id: string;
    userId1: string;
    userId2: string;
    displayName: string;
    displayName2: string
}

export interface Chat {
    timestamp: number;
    message: string;
    displayName: string;
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

export interface StartThread {
    myId: string;
    userId: string;
    initialMessage: string;
}