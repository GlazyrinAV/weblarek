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

export interface IBasketView extends IComponentView {
    set content(items: HTMLElement[]);

    set total(total: number);

    clear(): void;
}

export interface ICardView extends IComponentView {
    set title(title: string);

    set price(price: number | null);
}

export interface ICardWithImageView extends IComponentView {
    set image(src: string);

    set alt(alt: string);

    set category(category: string);
}

export interface ICardBasketView extends IComponentView {
    set index(index: number);
}

export interface ICardPreviewView extends IComponentView {
    set description(text: string);

    changeButtonToRemove(): void;

    disablePurchaseButton(): void;
}

export interface IGalleryView extends IComponentView {
    set catalog(items: HTMLElement[]);
}

export interface IHeaderView extends IComponentView {
    set counter(value: number);
}

export interface IModalView extends IComponentView {
    set content(content: HTMLElement);

    closeModal(): void;

    clear(): void;
}

export interface IOrderFormView extends IComponentView {
    set errors(errors: Partial<IValidationResult>);

    activeButton(): void;

    deActiveButton(): void;
}

export interface IOrderView extends IComponentView {
    set address(address: string);

    set payment(payment: TPayment);
}

export interface IContactsView extends IComponentView {
    set email(email: string);

    set phone(phone: string);
}

export interface IOrderResultView extends IComponentView {
    set total(total: number);
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