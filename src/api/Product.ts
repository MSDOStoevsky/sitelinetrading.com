/**
 * 
 */
export interface Product {
    id?: string;

    userId: string;

    displayName: string;

    title: string;

    state: string;

    image: any;

    description: string;

    value: number;

    openToTrade: boolean;

    createdTimestamp: number;

    updatedTimestamp: number;
}