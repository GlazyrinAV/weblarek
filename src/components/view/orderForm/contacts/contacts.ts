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
    protected sendOrderElement: HTMLButtonElement;

    protected constructor(protected events: IEvents, container: HTMLElement) {
        super(container);

        this.emailElement = ensureElement<HTMLInputElement>('email', this.container);
        this.phoneElement = ensureElement<HTMLInputElement>('phone', this.container);
        this.sendOrderElement = ensureElement<HTMLButtonElement>('button', this.container);

        this.emailElement.addEventListener('input', () => {
            this.events.emit('contacts:email');
        });

        this.phoneElement.addEventListener('input', () => {
            this.events.emit('contacts:phone');
        });

        this.sendOrderElement.addEventListener('click', () => {
            this.events.emit('contacts:send');
        });
    }
}