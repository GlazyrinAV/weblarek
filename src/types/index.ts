export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export type TPayment = 'CASH' | 'CARD';

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

export interface IBasketView extends IComponentView {
    set content(items: HTMLElement[]): void;

    set total(total: number): void;

    clear(): void;
}

export interface ICardView extends IComponentView {
    set title(title: string): void;

    set price(price: number | null): void;
}

export interface ICardWithImageView extends IComponentView {
    set image(src: string): void;

    set alt(alt: string): void;

    set category(category: string): void;
}

export interface ICardBasketView extends IComponentView {
    set index(index: number): void;
}

export interface ICardPreviewView extends IComponentView {
    set description(text: string): void;

    changeButtonToRemove(): void;

    disablePurchaseButton(): void;
}

export interface IGalleryView extends IComponentView {
    set catalog(items: HTMLElement[]): void;
}

export interface IHeaderView extends IComponentView {
    set counter(value: number): void;
}

export interface IModalView extends IComponentView {
    set content(content: HTMLElement): void;

    closeModal(): void;

    clear(): void;
}

export interface IOrderFormView extends IComponentView {
    set errors(errors: Partial<IValidationResult>): void;

    activeButton(): void;

    deActiveButton(): void;
}

export interface IOrderView extends IComponentView {
    set address(address: string): void;

    set payment(payment: TPayment): void;
}

export interface IContactsView extends IComponentView {
    set email(email: string): void;

    set phone(phone: string): void;
}

export interface IOrderResultView extends IComponentView {
    set total(total: number): void;
}

export interface IApiController {
    findAll(): Promise<IProduct[]>;

    save(order: IOrder): Promise<IOrderResult>;
}

export interface IComponentView {
    render(data?: Partial<T>): HTMLElement;
}

export interface CardConstructable {
    new(container: HTMLElement, actions?: ICardAction): ICardWithImageView | ICardBasketView | ICardPreviewView;
}