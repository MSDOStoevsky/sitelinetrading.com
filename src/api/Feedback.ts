export interface UserFeedback {
    id: string;
    userId: string;
    fromId: string;
    message: string;
    timestamp: number;
}

export interface Feedback {
    fromId: string;
    message: string;
}