/**
 * 
 */
export interface Product {
    _id?: string;

    userId: string;

    displayName: string;

    title: string;

    state: string;

    image: any;

    description: string;

    value: string;

    openToTrade: boolean;

    addedTimestamp: number;

    updatedTimestamp: number;
}