import {OrderForm} from "../orderForm.ts";
import {IEvents} from "../../../base/Events.ts";
import {debounce, ensureElement} from "../../../../utils/utils.ts";

interface IContactsData {
    email: string | null;
    phone: string | null;
}

export class Contacts extends OrderForm<IContactsData> {
    private readonly emailElement: HTMLInputElement;
    private readonly phoneElement: HTMLInputElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(events, container);

        this.emailElement = ensureElement<HTMLInputElement>('input[name="email"]', this.container);
        this.phoneElement = ensureElement<HTMLInputElement>('input[name="phone"]', this.container);

        this.emailElement.addEventListener('input',
            debounce(() => {
                this.events.emit('order:email', {value: this.emailElement.value});
                this.emailElement.focus();
            }, 500));

        this.phoneElement.addEventListener('input',
            debounce(() => {
                this.events.emit('order:phone', {value: this.phoneElement.value});
                this.phoneElement.focus();
            }, 500));

        this.orderButton.addEventListener('click', (event) => {
            event.preventDefault();
            this.events.emit('order:send');
        });
    }

    public set email(email: string) {
        this.emailElement.value = email;
    }

    public set phone(phone: string) {
        this.phoneElement.value = phone;
    }
}