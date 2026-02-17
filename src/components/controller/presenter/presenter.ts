import {
    CardConstructable,
    IApiController,
    IBasketView,
    IBuyerModel,
    ICardAction,
    ICardBasketView,
    ICardPreviewView,
    ICardWithImageView,
    ICartModel,
    IContactsView,
    IGalleryView,
    IHeaderView,
    IInputData,
    IModalView,
    IOrderResultView,
    IOrderView,
    IProduct,
    IProductModel
} from "../../../types";
import {cloneTemplate} from "../../../utils/utils";
import {IEvents} from "../../base/Events";
import {EventsType} from "../../base/EventsType";

export class Presenter {

    private api: IApiController;

    private products: IProductModel;

    private cart: ICartModel;

    private buyer: IBuyerModel;

    private gallery: IGalleryView;

    private header: IHeaderView;

    private modal: IModalView;

    private order: IOrderView & IOrderView;

    private contact: IOrderView & IContactsView;

    private result: IOrderResultView;

    private basket: IBasketView;

    private eventEmitter: IEvents;

    private cardCatalog: CardConstructable;

    private cardBasket: CardConstructable;

    private cardPreview: CardConstructable;


    constructor(api: IApiController, products: IProductModel, cart: ICartModel, buyer: IBuyerModel,
                gallery: IGalleryView, header: IHeaderView, modal: IModalView, order: IOrderView,
                contact: IOrderView & IContactsView, result: IOrderResultView, basket: IBasketView,
                eventEmitter: IEvents, cardCatalog: CardConstructable, cardBasket: CardConstructable,
                cardPreview: CardConstructable) {
        this.api = api;
        this.products = products;
        this.cart = cart;
        this.buyer = buyer;
        this.gallery = gallery;
        this.header = header;
        this.modal = modal;
        this.order = order;
        this.contact = contact;
        this.result = result;
        this.basket = basket;
        this.eventEmitter = eventEmitter;
        this.cardCatalog = cardCatalog;
        this.cardBasket = cardBasket;
        this.cardPreview = cardPreview;
    }

    public onNewCatalog(): void {
        const catalog: HTMLElement[] = [];

        this.products.getAll().forEach(element => {
            const productContainer = cloneTemplate('#card-catalog');
            const productElement: ICardWithImageView = this.createNewCard(this.cardCatalog, productContainer, {
                onClick: () => this.eventEmitter.emit(EventsType.CardOpen, element),
            });
            catalog.push(productElement.render(element));
        });

        this.gallery.render({catalog});
    }

    public onOpenCard(data: IProduct): void {
        this.products.setCurrentProduct(data);
    }

    public onChooseCurrent(): void {
        const product = this.products.getCurrentProduct();
        const productContainer = cloneTemplate('#card-preview');

        if (product) {
            const productElement: ICardPreviewView = this.createNewCard(this.cardPreview, productContainer, {
                onClick: () => {
                    this.eventEmitter.emit(EventsType.CardButtonAction, product)
                }
            });

            if (!product.price) {
                productElement.disablePurchaseButton();
            }

            if (this.cart.isProductInCart(product.id)) {
                productElement.changeButtonToRemove();
            }

            this.modal.render({content: productElement.render(product)});
        }
    }

    public onModalClose(): void {
        this.modal.closeModal();
    }

    public onCardAction(data: IProduct): void {
        const product = this.products.getCurrentProduct();
        if (product) {
            if (this.cart.isProductInCart(data.id)) {
                this.cart.remove(product.id);
            } else {
                this.cart.set(product);
            }
        }
    }

    public onOpenBasket() {
        this.basket.clear();
        this.renderBasket();
    }

    public onRemoveProduct(data: IProduct) {
        this.cart.remove(data.id);
    }

    public onCartChange() {
        if (document.body.querySelector('.modal__content > .basket')) {
            this.basket.clear();
            this.renderBasket();
        } else {
            this.modal.closeModal();
        }

        this.header.counter = this.cart.getTotalCount();
    }

    public onNewOrder() {
        this.renderOrder(this.order);
    }

    public onOrderCard() {
        this.buyer.set({payment: "CARD"});
    }

    public onOrderCash() {
        this.buyer.set({payment: "CASH"});
    }

    public onOrderAddress(data: IInputData) {
        const value = data.value;
        this.buyer.set({address: value});
    }

    public onOrderEmail(data: IInputData) {
        const value = data.value;
        this.buyer.set({email: value});
    }

    public onOrderPhone(data: IInputData) {
        const value = data.value;
        this.buyer.set({phone: value});
    }

    public onOrderSend() {
        this.api.save({
            ...this.buyer.getAll(),
            total: this.cart.getTotalPrice(),
            items: this.cart.getAll().map(item => {
                return item.id;
            }),
        })
            .then(data => {
                const resultElement = this.result.render({total: data.total});

                this.modal.clear();
                this.modal.render({content: resultElement});

                this.cart.clear();
                this.buyer.clear();
            })
            .catch(error => console.log(error.message));
    }

    public onBuyerChange() {
        if (document.body.querySelector('.modal__content > form[name="contacts"]')) {
            this.renderContacts(this.contact);
        } else if (document.body.querySelector('.modal__content > form[name="order"]')) {
            this.renderOrder(this.order);
        }
    }

    public onNewContacts() {
        this.renderContacts(this.contact);
    }

    public onResultOk() {
        this.modal.closeModal();
    }

    public onEmptyCart() {
        this.basket.clear();
        this.header.counter = this.cart.getTotalCount();
    }

    // отрисовка модального окна с корзиной товаров при изменении её состава
    private renderBasket(): void {
        const basketCatalog: HTMLElement[] = [];
        const cartProducts = this.cart.getAll();

        for (let i = 0; i < cartProducts.length; i++) {
            const productContainer = cloneTemplate('#card-basket');
            const productElement: ICardBasketView = this.createNewCard(this.cardBasket, productContainer, {
                onClick: () => this.eventEmitter.emit(EventsType.CardRemoveButton, cartProducts[i]),
            });
            productElement.index = i + 1;
            basketCatalog.push(productElement.render(cartProducts[i]));
        }

        const data = {
            total: `${this.cart.getTotalPrice()} синапсов`,
            content: basketCatalog
        }

        this.modal.render({content: this.basket.render(data)});
    }

    // отрисовка заказа
    private renderOrder(order: IOrderView): void {
        order.errors = {
            payment: this.buyer.validate()['payment'],
            address: this.buyer.validate()['address'],
        };

        this.renderForm(order);
    }

    // отрисовка контактов
    private renderContacts(order: IContactsView): void {
        order.errors = {
            phone: this.buyer.validate()['phone'],
            email: this.buyer.validate()['email'],
        };

        this.renderForm(order);
    }

    private renderForm(order: IOrderView | IContactsView) {
        this.modal.clear();
        this.modal.render({
            content: order.render({
                ...this.buyer.getAll()
            })
        });
    }

    private createNewCard(constructor: CardConstructable, container: HTMLElement, actions?: ICardAction) {
        return new constructor(container, actions);
    }
}