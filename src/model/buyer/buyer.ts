import {IBuyer, IValidationResult} from "../../types";

export class Buyer {

    private _buyer: IBuyer | null;

    constructor() {
        this._buyer = null;
    }

    save(buyer: IBuyer): IBuyer {
        if (!this._buyer) {
            this._buyer = buyer;
        } else {
            if (buyer.address && buyer.address.trim().length > 0) {
                this._buyer.address = buyer.address;
            }
            if (buyer.email && buyer.email.trim().length > 0) {
                this._buyer.email = buyer.email;
            }
            if (buyer.payment) {
                this._buyer.payment = buyer.payment;
            }
            if (buyer.phone && buyer.phone.trim().length > 0) {
                this._buyer.phone = buyer.phone;
            }
        }

        return this._buyer;
    }

    findAll(): IBuyer | null {
        return this._buyer;
    }

    clear(): void {
        this._buyer = null;
    }

    validate(): IValidationResult {
        let errors: IValidationResult = {};

        if (this._buyer) {
            if (!this._buyer.email || this._buyer.email.trim().length == 0) {
                errors['email'] = "Укажите электронную почту";
            }
            if (!this._buyer.phone || this._buyer.phone.trim().length == 0) {
                errors['phone'] = "Укажите контактный телефон";
            }
            if (!this._buyer.address || this._buyer.address.trim().length == 0) {
                errors['address'] = "Укажите адрес доставки";
            }
            if (!this._buyer.payment || this._buyer.payment.trim().length == 0) {
                errors['payment'] = "Укажите способ платежа";
            }
        } else {
            throw new Error("Данные по покупателю отсутствуют.")
        }

        return errors;
    }
}