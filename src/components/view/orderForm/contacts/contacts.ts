import {OrderForm} from "../orderForm.ts";
import {IEvents} from "../../../base/Events.ts";
import {ensureElement} from "../../../../utils/utils.ts";

interface IContactsData {
    email: string | null;
    phone: string | null;
}

export class Contacts extends OrderForm<IContactsData> {
    protected emailElement: HTMLInputElement;
    protected phoneElement: HTMLInputElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(events, container);

        this.emailElement = ensureElement<HTMLInputElement>('.email', this.container);
        this.phoneElement = ensureElement<HTMLInputElement>('.phone', this.container);

        this.emailElement.addEventListener('input', () => {
            this.events.emit('order:email');
        });

        this.phoneElement.addEventListener('input', () => {
            this.events.emit('order:phone');
        });

        this.orderButton.addEventListener('click', () => {
            this.events.emit('order:send');
        });
    }
}