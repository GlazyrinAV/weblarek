import './scss/styles.scss';
import {ApiController} from "./components/controller/apiController/apiController.ts";
import {Api} from "./components/base/Api.ts";
import {API_URL} from "./utils/constants.ts";
import {Buyer} from "./components/model/buyer/buyer.ts";
import {Cart} from "./components/model/cart/cart.ts";
import {Products} from "./components/model/product/products.ts";
import {EventEmitter} from "./components/base/Events.ts";
import {Gallery} from "./components/view/gallery/galllery.ts";
import {CardCatalog} from "./components/view/card/cardCatalog/cardCatalog.ts";
import {cloneTemplate} from "./utils/utils.ts";
import {CardPreview} from "./components/view/card/cardPreview/cardPreview.ts";
import {Modal} from "./components/view/modal/modal.ts";
import {Header} from "./components/view/header/header.ts";
import {Basket} from "./components/view/basket/basket.ts";
import {CardBasket} from "./components/view/card/cardBasket/cardBasket.ts";
import {Order} from "./components/view/orderForm/order/order.ts";
import {Contacts} from "./components/view/orderForm/contacts/contacts.ts";
import {OrderResult} from "./components/view/orderResult/orderResult.ts";
import {IInputData, IProduct} from "./types";

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

// product:receivedCatalog
eventEmitter.on('product:receivedCatalog', () => {
    const catalog: HTMLElement[] = [];

    products.getAll().forEach(element => {
        const productContainer = cloneTemplate('#card-catalog');
        const productElement = new CardCatalog(productContainer, {
            onClick: () => eventEmitter.emit('card:open', element),
        });
        catalog.push(productElement.render(element));
    });

    gallery.render({catalog});
});

// card:open
eventEmitter.on('card:open', (data: IProduct) => {
    products.setCurrentProduct(data);
});

// product:chosenCurrent
eventEmitter.on('product:chosenCurrent', () => {
    const product = products.getCurrentProduct();
    const productContainer = cloneTemplate('#card-preview');

    if (product) {
        const productElement = new CardPreview(productContainer, {
            onClick: () => {
                eventEmitter.emit('card:buttonAction', product)
            }
        });

        if (!product.price) {
            productElement.disablePurchaseButton();
        }

        if (cart.isProductInCart(product.id)) {
            productElement.changeButtonToRemove();
        }

        modal.render({content: productElement.render(product)});
    }
})

// modal:closeButton
eventEmitter.on('modal:closeButton', () => {
    modal.closeModal()
});

// card:buttonAction
eventEmitter.on('card:buttonAction', (data: IProduct) => {
    const product = products.getCurrentProduct();
    if (product) {
        if (cart.isProductInCart(data.id)) {
            cart.remove(product.id);
        } else {
            cart.set(product);
        }
    }
});

// header:basket
eventEmitter.on('header:basket', () => {
    renderBasket();
});

// card:removeButton
eventEmitter.on('card:removeButton', (data: IProduct) => {
    cart.remove(data.id);
});

// cart:change
eventEmitter.on('cart:change', () => {
    if (document.body.querySelector('.modal__content > .basket')) {
        modal.clear();
        renderBasket();
    } else {
        modal.closeModal();
    }

    header.counter = cart.getTotalCount();
});

// order:new
eventEmitter.on('order:new', () => {
    renderOrder(order);
});

// order:card
eventEmitter.on('order:card', () => {
    buyer.set({payment: "CARD"});
});

// order:cash
eventEmitter.on('order:cash', () => {
    buyer.set({payment: "CASH"});
});

// order:address
eventEmitter.on('order:address', (data: IInputData) => {
    const value = data.value;
    buyer.set({address: value});
});

// order:email
eventEmitter.on('order:email', (data: IInputData) => {
    const value = data.value;
    buyer.set({email: value});
});

// order:phone
eventEmitter.on('order:phone', (data: IInputData) => {
    const value = data.value;
    buyer.set({phone: value});
});

// order:send
eventEmitter.on('order:send', () => {
    api.save({
        ...buyer.getAll(),
        total: cart.getTotalPrice(),
        items: cart.getAll().map(item => {
            return item.id;
        }),
    })
        .then(data => {
            const resultElement = result.render({total: data.total});

            modal.clear();
            modal.render({content: resultElement});

            cart.clear();
            buyer.clear();
        })
        .catch(error => console.log(error.message));
});

// buyer:changeOrder
eventEmitter.on('buyer:changeOrder', () => {
    renderOrder(order);
});

// buyer:changeContacts
eventEmitter.on('buyer:changeContacts', () => {
    renderContacts(contact);
});

// contacts:new
eventEmitter.on('contacts:new', () => {
    renderContacts(contact);
});

// result:ok
eventEmitter.on('result:ok', () => {
    modal.closeModal();
});

// cart:empty
eventEmitter.on('cart:empty', () => {
    header.counter = cart.getTotalCount();
});

// отрисовка модального окна с корзиной товаров при изменении её состава
function renderBasket(): void {
    const basketContainer = cloneTemplate("#basket");
    const basket = new Basket(eventEmitter, basketContainer);
    const basketCatalog: HTMLElement[] = [];

    const cartProducts = cart.getAll();

    for (let i = 0; i < cartProducts.length; i++) {
        const productContainer = cloneTemplate('#card-basket');
        const productElement = new CardBasket(productContainer, {
            onClick: () => eventEmitter.emit('card:removeButton', cartProducts[i]),
        });
        productElement.index = i + 1;
        basketCatalog.push(productElement.render(cartProducts[i]));
    }

    const data = {
        total: `${cart.getTotalPrice()} синапсов`,
        content: basketCatalog
    }

    modal.render({content: basket.render(data)});
}

// отрисовка заказа
function renderOrder(order: Order): void {
    order.errors = {
        payment: buyer.validate()['payment'],
        address: buyer.validate()['address'],
    };

    modal.clear();
    renderForm(order);
}

// отрисовка контактов
function renderContacts(order: Contacts): void {
    order.errors = {
        phone: buyer.validate()['phone'],
        email: buyer.validate()['email'],
    };

    modal.clear();
    renderForm(order);
}

function renderForm(order: Order | Contacts) {
    modal.render({
        content: order.render({
            ...buyer.getAll()
        })
    });
}

//Получение от сервера списка товаров
await api.findAll().then(data => {
    products.setAll(data);
})
    .catch(error => console.log(error));