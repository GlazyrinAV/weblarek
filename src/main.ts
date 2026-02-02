import './scss/styles.scss';
import {ApiController} from "./components/controller/apiController/apiController.ts";
import {Api} from "./components/base/Api.ts";
import {API_URL} from "./utils/constants.ts";
import {Buyer} from "./components/model/buyer/buyer.ts";
import {Cart} from "./components/model/cart/cart.ts";
import {IBuyer, IOrder} from "./types";
import {Products} from "./components/model/product/products.ts";

const products = new Products();
const buyer = new Buyer();
const cart = new Cart();
const api = new ApiController(new Api(API_URL));

//Получение от сервера списка товаров
await api.findAll().then(data => {
    console.log(data);
    products.setAll(data);
})
    .catch(error => console.log(error));

// Проверка товаров
console.log(products.getAll());
console.log(products.getById("1c521d84-c48d-48fa-8cfb-9d911fa515fd"));
const newProduct1 = products.getById("1c521d84-c48d-48fa-8cfb-9d911fa515fd");
if (newProduct1) {
    products.setCurrentProduct(newProduct1);
}
console.log(products.getCurrentProduct());

// Проверка корзины
const newProduct2 = products.getCurrentProduct();
if (newProduct2) {
    cart.set(newProduct2);
}
console.log(cart.isProductInCart("1c521d84-c48d-48fa-8cfb-9d911fa515fd"));
console.log(cart.getTotalCount());
console.log(cart.getTotalPrice());
const newProduct3 = products.getById("1c521d84-c48d-48fa-8cfb-9d911fa515fd");
if (newProduct3) {
    cart.set(newProduct3);
}
cart.remove("1c521d84-c48d-48fa-8cfb-9d911fa515fd");
console.log(cart.getAll());
cart.clear();
console.log(cart.getAll());

const newBuyer: IBuyer = {
    payment: "CASH",
    email: "",
    phone: null,
    address: "Moscow, Kremlin",
};

const updateBuyer: IBuyer = {
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
const finalBuyer: IBuyer = {
    payment: "CASH",
    email: "A@A.com",
    phone: "81112223344",
    address: "Moscow, Kremlin",
};

if (newProduct3) {
    cart.set(newProduct3);
}
if (newProduct2) {
    cart.set(newProduct2);
}

const newOrder: IOrder = {
    ...finalBuyer,
    total: cart.getTotalPrice(),
    items: cart.getAll().map(item => {
        return item.id;
    })
}

try {
    const order = await api.save(newOrder);
    console.log(order);
} catch (error) {
    console.log(error);
}