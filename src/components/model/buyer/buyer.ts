import {IBuyer, IValidationResult} from "../../../types";
import {IEvents} from "../../base/Events.ts";

export class Buyer {

    private buyer: IBuyer = {
        address: "",
        email: "",
        payment: null,
        phone: ""
    }

    constructor(protected events: IEvents) {
    }

    set(buyer: Partial<IBuyer>): void {
        if (buyer.address != null) {
            this.buyer.address = buyer.address;
            this.events.emit('buyer:changeOrder');
        }
        if (buyer.email != null) {
            this.buyer.email = buyer.email;
            this.events.emit('buyer:changeContacts');
        }
        if (buyer.payment) {
            this.buyer.payment = buyer.payment;
            this.events.emit('buyer:changeOrder');
        }
        if (buyer.phone != null) {
            this.buyer.phone = buyer.phone;
            this.events.emit('buyer:changeContacts');
        }
    }

    getAll(): IBuyer {
        return this.buyer;
    }

    clear(): void {
        this.buyer = {
            address: "",
            email: "",
            payment: null,
            phone: ""
        };
        this.events.emit('buyer:empty');
    }

    validate(): IValidationResult {
        const errors: IValidationResult = {};

        if (!this.buyer.email || this.buyer.email.trim().length == 0) {
            errors['email'] = "Укажите электронную почту";
        }
        if (!this.buyer.phone || this.buyer.phone.trim().length == 0) {
            errors['phone'] = "Укажите контактный телефон";
        }
        if (!this.buyer.address || this.buyer.address.trim().length == 0) {
            errors['address'] = "Укажите адрес доставки";
        }
        if (!this.buyer.payment || this.buyer.payment.trim().length == 0) {
            errors['payment'] = "Укажите способ платежа";
        }

        return errors;
    }
}