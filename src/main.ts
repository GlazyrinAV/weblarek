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

// IEvent
const eventEmitter = new EventEmitter();

//Model
const products = new Products(eventEmitter);
const cart = new Cart(eventEmitter);
let buyer: Buyer;

// Controller
const api = new ApiController(new Api(API_URL));

// View
const header = new Header(eventEmitter, document.body);
const gallery = new Gallery(document.body);
const modal = new Modal(eventEmitter, document.body);
let order: Order;
let contact: Contacts;

// product:receivedCatalog
eventEmitter.on('product:receivedCatalog', () => {
    let catalog: HTMLElement[] = [];

    products.getAll().forEach(element => {
        const productContainer = cloneTemplate('#card-catalog');
        const productElement = new CardCatalog(eventEmitter, productContainer);
        catalog.push(productElement.render(element));
    });

    gallery.render({catalog});
});

// card:open
eventEmitter.on('card:open', (data: HTMLDataElement) => {
    const product = products.getById(data.id);
    if (product) {
        products.setCurrentProduct(product);
    }
});

// product:chosenCurrent
eventEmitter.on('product:chosenCurrent', () => {
    const product = products.getCurrentProduct();
    const productContainer = cloneTemplate('#card-preview');
    const productElement = new CardPreview(eventEmitter, productContainer);

    if (product) {
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
eventEmitter.on('modal:closeButton', (container: Modal) => {
    container.closeModal();
});

// card:buttonAction
eventEmitter.on('card:buttonAction', (data) => {
    const product = products.getCurrentProduct();
    if (product) {
        if ((data as HTMLButtonElement).dataset.type === 'add') {
            cart.set(product);
        } else {
            cart.remove(product.id);
        }
    }
});

// header:basket
eventEmitter.on('header:basket', () => {
    renderBasket();
});

// card:removeButton
eventEmitter.on('card:removeButton', (data: HTMLDataElement) => {
    cart.remove(data.id);
});

// cart:change
eventEmitter.on('cart:change', () => {
    if (modal.content.querySelector('.basket')) {
        modal.clear();
        renderBasket();
    } else {
        modal.closeModal();
    }

    header.counter = cart.getTotalCount();
});

// order:new
eventEmitter.on('order:new', () => {
    buyer = new Buyer(eventEmitter);
    const orderContainer = cloneTemplate('#order');
    order = new Order(eventEmitter, orderContainer);

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
eventEmitter.on('order:address', (data: HTMLInputElement) => {
    buyer.set({address: data.value});
});

// order:email
eventEmitter.on('order:email', (data: HTMLInputElement) => {
    buyer.set({email: data.value});
});

// order:phone
eventEmitter.on('order:phone', (data: HTMLInputElement) => {
    buyer.set({phone: data.value});
});

// order:validationSuccess
eventEmitter.on('order:validationSuccess', (data: HTMLFormElement) => {
    data.name === 'order' ? order.activeButton() : contact.activeButton();

});

// order:validationFail
eventEmitter.on('order:validationFail', (data: HTMLFormElement) => {
    data.name === 'order' ? order.deActiveButton() : contact.deActiveButton();
});

// order:send
eventEmitter.on('order:send', () => {
    const resultContainer = cloneTemplate('#success');
    const result = new OrderResult(eventEmitter, resultContainer);

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
    if (order) {
        renderOrder(order);
    }
});

// buyer:changeContacts
eventEmitter.on('buyer:changeContacts', () => {
    if (contact) {
        renderOrder(contact);
    }
});

// contacts:new
eventEmitter.on('contacts:new', () => {
    const contactContainer = cloneTemplate('#contacts');
    contact = new Contacts(eventEmitter, contactContainer);

    renderOrder(contact);
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
    let basketCatalog: HTMLElement[] = [];

    const cartProducts = cart.getAll();

    for (let i = 0; i < cartProducts.length; i++) {
        const productContainer = cloneTemplate('#card-basket');
        const productElement = new CardBasket(eventEmitter, productContainer);
        productElement.index = i + 1;
        basketCatalog.push(productElement.render(cartProducts[i]));
    }

    let data = {
        total: `${cart.getTotalPrice()} синапсов`,
        content: basketCatalog
    }

    modal.render({content: basket.render(data)});
}

// отрисовка заказа
function renderOrder(order: Order | Contacts): void {
    modal.clear();
    order.errors = buyer.validate();
    if (order instanceof Order) {
        modal.render({
            content: order.render({
                payment: buyer.getAll().payment,
                address: buyer.getAll().address
            })
        });
    } else {
        modal.render({
            content: order.render({
                phone: buyer.getAll().phone,
                email: buyer.getAll().email
            })
        });
    }
}

//Получение от сервера списка товаров
await api.findAll().then(data => {
    products.setAll(data);
})
    .catch(error => console.log(error));