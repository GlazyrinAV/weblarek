import {OrderForm} from "../orderForm.ts";
import {IEvents} from "../../../base/Events.ts";
import {debounce, ensureElement} from "../../../../utils/utils.ts";
import {IContactsView} from "../../../../types";
import {EventsType} from "../../../base/EventsType";

interface IContactsData {
    email: string | null;
    phone: string | null;
}

export class Contacts extends OrderForm<IContactsData> implements IContactsView {
    private emailElement: HTMLInputElement;
    private phoneElement: HTMLInputElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(events, container);

        this.emailElement = ensureElement<HTMLInputElement>('input[name="email"]', this.container);
        this.phoneElement = ensureElement<HTMLInputElement>('input[name="phone"]', this.container);

        this.emailElement.addEventListener('input',
            debounce(() => {
                this.events.emit(EventsType.OrderEmailChange, {value: this.emailElement.value});
                this.emailElement.focus();
            }, 500));

        this.phoneElement.addEventListener('input',
            debounce(() => {
                this.events.emit(EventsType.OrderPhoneChange, {value: this.phoneElement.value});
                this.phoneElement.focus();
            }, 500));

        this.orderButton.addEventListener('click', (event) => {
            event.preventDefault();
            this.events.emit(EventsType.OrderSend);
        });
    }

    public set email(email: string) {
        this.emailElement.value = email;
    }

    public set phone(phone: string) {
        this.phoneElement.value = phone;
    }
}