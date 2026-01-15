import {IBuyer} from "../../types";
import {IValidationResult} from "../../types";

export class Buyer {

    private _buyer: IBuyer | null;

    constructor() {
        this._buyer = null;
    }

    save(buyer: IBuyer): IBuyer {
        if (!this._buyer) {
            this._buyer = buyer;
        } else {
            if (buyer.address && buyer.address?.trim().length > 0) {
                this._buyer.address = buyer.address;
            } else if (buyer.email && buyer.email?.trim().length > 0) {
                this._buyer.email = buyer.email;
            } else if (buyer.payment) {
                this._buyer.payment = buyer.payment;
            } else if (buyer.phone && buyer.phone?.trim().length > 0) {
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

    validate(buyer: IBuyer): IValidationResult {
        let errors: IValidationResult = {};

        const keys = Object.keys(buyer);

        keys.forEach(key => {
            if (!buyer[key as keyof typeof buyer] || (typeof(buyer[key as keyof typeof buyer]) === "string" &&
                buyer[key as keyof typeof buyer]?.trim().length == 0)) {
                errors[key as keyof typeof errors] = `Please specify ${key}`;
            }
        })
        return errors;
    }
}