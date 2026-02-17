export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export type TPayment = 'CASH' | 'CARD' | 'UNSELECTED';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;

    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}

export interface IBuyer {
    payment: TPayment;
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
    items: string[];
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

export interface IProductModel {
    setAll(data: IProduct[]): void;

    getAll(): IProduct[];

    getById(id: string): IProduct | null;

    setCurrentProduct(product: IProduct): void;

    getCurrentProduct(): IProduct | null;
}

export interface ICartModel {
    getAll(): IProduct[];

    set(product: IProduct): void;

    remove(id: string): void;

    clear(): void;

    getTotalPrice(): number;

    getTotalCount(): number;

    isProductInCart(id: string): boolean;
}

export interface IBuyerModel {
    set(buyer: Partial<IBuyer>): void;

    getAll(): IBuyer;

    clear(): void;

    validate(): IValidationResult;
}

export interface IBasketView {
    set content(items: HTMLElement[]);

    set total(total: number);

    clear(): void;
}

export interface ICardView {
    set title(title: string);

    set price(price: number | null);
}

export interface ICardWithImageView {
    set image(src: string);

    set alt(alt: string);

    set category(category: string);
}

export interface ICardBasketView {
    set index(index: number);
}

export interface ICardPreviewView {
    set description(text: string);

    changeButtonToRemove(): void;

    disablePurchaseButton(): void;
}

export interface IGalleryView {
    set catalog(items: HTMLElement[]);
}

export interface IHeaderView {
    set counter(value: number);
}

export interface IModalView {
    set content(content: HTMLElement);

    closeModal(): void;

    clear(): void;
}

export interface IOrderFormView {
    set errors(errors: Partial<IValidationResult>);
}

export interface IOrderView extends IOrderFormView {
    set address(address: string);

    set payment(payment: TPayment);
}

export interface IContactsView extends IOrderFormView {
    set email(email: string);

    set phone(phone: string);
}

export interface IOrderResultView {
    set total(total: number);
}

export interface IApiController {
    findAll(): Promise<IProduct[]>;

    save(order: IOrder): Promise<IOrderResult>;
}

export interface IComponentView {
    render(data?: Object): HTMLElement;
}

export interface ICardData {
    title: string;
    price: number | null;
}

export interface ICardWithImageData extends ICardData {
    image: string;
    category: string;
    alt: string | null
}

export interface ICardPreviewData extends ICardWithImageData {
    description: string;
}

export interface ICardBasketData extends ICardData {
    index: number;
}

export interface CardConstructable {
    new(container: HTMLElement, actions?: ICardAction);
}