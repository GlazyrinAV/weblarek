import './scss/styles.scss';
import {ApiController} from "./controller/APIController/apiController.ts";
import {Api} from "./components/base/Api.ts";
import {API_URL} from "./utils/constants.ts";
import {Product} from "./model/product/product.ts";
import {Buyer} from "./model/buyer/buyer.ts";
import {Cart} from "./model/cart/cart.ts";
import {IBuyer} from "./types";

let product = new Product();
let buyer = new Buyer();
let cart = new Cart();
let api = new ApiController(new Api(API_URL));

//Получение от сервера списка товаров
await api.findAll().then(data => {
    console.log(data);
    product.saveAll(data);
});

// Проверка товаров
console.log(product.findAll());
console.log(product.findById("1c521d84-c48d-48fa-8cfb-9d911fa515fd"));
console.log(product.saveCurrentProduct("6a834fb8-350a-440c-ab55-d0e9b959b6e3"));
console.log(product.findCurrentProduct());

// Проверка корзины
console.log(cart.save(product.findCurrentProduct()));
console.log(cart.isProductInCart("1c521d84-c48d-48fa-8cfb-9d911fa515fd"));
console.log(cart.findTotalCount());
console.log(cart.findTotalPrice());
console.log(cart.save(product.findById("1c521d84-c48d-48fa-8cfb-9d911fa515fd")));
cart.remove("1c521d84-c48d-48fa-8cfb-9d911fa515fd");
console.log(cart.findAll());
cart.clear();
console.log(cart.findAll());

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
console.log(buyer.save(newBuyer));
console.log(buyer.validate());
console.log(buyer.save(updateBuyer));
console.log(buyer.validate());
console.log(buyer.findAll());
buyer.clear();
console.log(buyer.findAll());

// Проверка отправки заказа на сервер
let finalBuyer: IBuyer = {
    payment: "CASH",
    email: "A@A.com",
    phone: "81112223344",
    address: "Moscow, Kremlin",
};

buyer.save(finalBuyer);
cart.save(product.findById("1c521d84-c48d-48fa-8cfb-9d911fa515fd"));
cart.save(product.findById("6a834fb8-350a-440c-ab55-d0e9b959b6e3"));

let order = await api.save(finalBuyer, cart.findAll());
console.log(order);