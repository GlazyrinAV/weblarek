import './scss/styles.scss';
import {ApiController} from "./components/controller/apiController/apiController.ts";
import {Api} from "./components/base/Api.ts";
import {API_URL} from "./utils/constants.ts";
import {Buyer} from "./components/model/buyer/buyer.ts";
import {Cart} from "./components/model/cart/cart.ts";
import {Products} from "./components/model/product/products.ts";
import {EventEmitter} from "./components/base/Events.ts";
import {Gallery} from "./components/view/gallery/galllery.ts";
import {cloneTemplate} from "./utils/utils.ts";
import {Modal} from "./components/view/modal/modal.ts";
import {Header} from "./components/view/header/header.ts";
import {Order} from "./components/view/orderForm/order/order.ts";
import {Contacts} from "./components/view/orderForm/contacts/contacts.ts";
import {OrderResult} from "./components/view/orderResult/orderResult.ts";
import {IInputData, IProduct} from "./types";
import {Presenter} from "./components/controller/presenter/presenter";
import {CardCatalog} from "./components/view/card/cardCatalog/cardCatalog";
import {CardPreview} from "./components/view/card/cardPreview/cardPreview";
import {Basket} from "./components/view/basket/basket";
import {CardBasket} from "./components/view/card/cardBasket/cardBasket";
import {EventsType} from "./components/base/EventsType";

// IEvent
const eventEmitter = new EventEmitter();

//Model
const products = new Products(eventEmitter);
const cart = new Cart(eventEmitter);
const buyer = new Buyer(eventEmitter);

// Controller
const api = new ApiController(new Api(API_URL));

// View
const header = new Header(eventEmitter, document.body);
const gallery = new Gallery(document.body);
const modal = new Modal(eventEmitter, document.body);
const order = new Order(eventEmitter, cloneTemplate('#order'));
const contact = new Contacts(eventEmitter, cloneTemplate('#contacts'));
const result = new OrderResult(eventEmitter, cloneTemplate('#success'));
const basket = new Basket(eventEmitter, cloneTemplate("#basket"));

// Presenter
const presenter = new Presenter(api, products, cart, buyer, gallery, header, modal, order, contact,
    result, basket, eventEmitter, CardCatalog, CardBasket, CardPreview);

// product:receivedCatalog // onNewCatalog
eventEmitter.on(EventsType.ProductNewCatalog, () => {
    presenter.onNewCatalog();
});

// card:open // onOpenCard
eventEmitter.on(EventsType.CardOpen, (data: IProduct) => {
    presenter.onOpenCard(data);
});

// product:chosenCurrent // onChooseCurrent
eventEmitter.on(EventsType.ProductChooseCurrent, () => {
    presenter.onChooseCurrent();
})

// modal:closeButton // onModalClose
eventEmitter.on(EventsType.ModalCloseButton, () => {
    presenter.onModalClose();
});

// card:buttonAction // onCardAction
eventEmitter.on(EventsType.CardButtonAction, (data: IProduct) => {
    presenter.onCardAction(data);
});

// header:basket // onOpenBasket
eventEmitter.on(EventsType.OpenBasket, () => {
    presenter.onOpenBasket();
});

// card:removeButton // onRemoveProduct
eventEmitter.on(EventsType.CardRemoveButton, (data: IProduct) => {
    presenter.onRemoveProduct(data);
});

// cart:change // onCartChange
eventEmitter.on(EventsType.CartChange, () => {
    presenter.onCartChange();
});

// order:new // onNewOrder
eventEmitter.on(EventsType.OrderNew, () => {
    presenter.onNewOrder();
});

// order:card // onOrderCard
eventEmitter.on(EventsType.OrderChooseCard, () => {
    presenter.onOrderCard();
});

// order:cash // onOrderCash
eventEmitter.on(EventsType.OrderChooseCash, () => {
    presenter.onOrderCash();
});

// order:address // onOrderAddress
eventEmitter.on(EventsType.OrderAddressChange, (data: IInputData) => {
    presenter.onOrderAddress(data);
});

// order:email // onOrderEmail
eventEmitter.on(EventsType.OrderEmailChange, (data: IInputData) => {
    presenter.onOrderEmail(data)
});

// order:phone // onOrderPhone
eventEmitter.on(EventsType.OrderPhoneChange, (data: IInputData) => {
    presenter.onOrderPhone(data);
});

// order:send // onOrderSend
eventEmitter.on(EventsType.OrderSend, () => {
    presenter.onOrderSend();
});

// buyer:change // onBuyerChange
eventEmitter.on(EventsType.BuyerChange, () => {
    presenter.onBuyerChange();
});

// contacts:new // onNewContacts
eventEmitter.on(EventsType.ContactsNew, () => {
    presenter.onNewContacts();
});

// result:ok // onResultOk
eventEmitter.on(EventsType.ResultOkButton, () => {
    presenter.onResultOk();
});

// cart:empty // onEmptyCart
eventEmitter.on(EventsType.CartEmpty, () => {
    presenter.onEmptyCart();
});

//Получение от сервера списка товаров
await api.findAll().then(data => {
    products.setAll(data);
})
    .catch(error => console.log(error));