/**
 * 
 */
export interface Product {
    _id?: string;

    userId: string;

    title: string;

    state: string;

    image: any;

    description: string;

    value: string;

    openToTrade: boolean;

    addedTimestamp: string;

    updatedTimestamp: string;
}