export declare class CreateActivityDto {
    title: string;
    description: string;
    category: string;
    image: string;
    gallery?: string[];
    date: string;
    location: string;
    targetAmount: number;
    raisedAmount: number;
    beneficiaries: number;
    status: string;
    details: string;
}
export declare class UpdateActivityDto {
    title?: string;
    description?: string;
    category?: string;
    image?: string;
    gallery?: string[];
    date?: string;
    location?: string;
    targetAmount?: number;
    raisedAmount?: number;
    beneficiaries?: number;
    status?: string;
    details?: string;
}
