export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export type TPayment = 'CASH' | 'CARD';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export interface  IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}

export interface IBuyer {
    payment: TPayment | null;
    email: string | null;
    phone: string | null;
    address: string | null;
}

export interface IValidationResult {
    [key: string]: string;
}