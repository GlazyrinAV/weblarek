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

export interface IProductList {
    total: number;
    items: IProduct[];
}

export interface IOrder extends IBuyer {
    total: number,
    items: String[];
}

export interface IOrderResult {
    id: string,
    total: number
}

export interface IValidationResult {
    [key: string]: string;
}

export interface ICardAction {
    onClick: EventListenerOrEventListenerObject;
}

export interface IInputData {
    value: string;
}