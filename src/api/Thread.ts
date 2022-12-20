export interface Thread {
    _id: string;

    chat: Array<Chat>;
}

export interface Chat {

    message: string;

    timestamp: number;

    userId: string;

    userName?: string;
}