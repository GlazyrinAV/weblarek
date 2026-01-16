import './scss/styles.scss';
import {ApiController} from "./components/controller/APIController/apiController.ts";
import {Api} from "./components/base/Api.ts";
import {API_URL} from "./utils/constants.ts";
import {Product} from "./components/model/product/product.ts";
import {Buyer} from "./components/model/buyer/buyer.ts";
import {Cart} from "./components/model/cart/cart.ts";
import {IBuyer, IOrder} from "./types";

let product = new Product();
let buyer = new Buyer();
let cart = new Cart();
let api = new ApiController(new Api(API_URL));

//Получение от сервера списка товаров
await api.findAll().then(data => {
    console.log(data);
    product.setAll(data);
});

// Проверка товаров
console.log(product.getAll());
console.log(product.getById("1c521d84-c48d-48fa-8cfb-9d911fa515fd"));
let p = product.getById("1c521d84-c48d-48fa-8cfb-9d911fa515fd");
if (p) {
    product.setCurrentProduct(p);
}
console.log(product.getCurrentProduct());

// Проверка корзины
let c = product.getCurrentProduct();
if (c) {
    cart.set(c);
}
console.log(cart.isProductInCart("1c521d84-c48d-48fa-8cfb-9d911fa515fd"));
console.log(cart.getTotalCount());
console.log(cart.getTotalPrice());
let b = product.getById("1c521d84-c48d-48fa-8cfb-9d911fa515fd");
if (b) {
    cart.set(b);
}
cart.remove("1c521d84-c48d-48fa-8cfb-9d911fa515fd");
console.log(cart.getAll());
cart.clear();
console.log(cart.getAll());

let newBuyer: IBuyer = {
    payment: "CASH",
    email: "",
    phone: null,
    address: "Moscow, Kremlin",
};

let updateBuyer: IBuyer = {
    payment: "CASH",
    email: "A@A.com",
    phone: "",
    address: "Moscow, Kremlin",
};

// Проверка заказа
buyer.set(newBuyer);
console.log(buyer.validate());
buyer.set(updateBuyer);
console.log(buyer.validate());
console.log(buyer.getAll());
buyer.clear();
console.log(buyer.getAll());

// Проверка отправки заказа на сервер
let finalBuyer: IBuyer = {
    payment: "CASH",
    email: "A@A.com",
    phone: "81112223344",
    address: "Moscow, Kremlin",
};

if (b) {
    cart.set(b);
}
if (c) {
    cart.set(c);
}

let newOrder: IOrder = {
    ...finalBuyer,
    total: cart.getTotalPrice(),
    items: cart.getAll().map(item => {
        return item.id;
    })
}

let order = await api.save(newOrder);
console.log(order);