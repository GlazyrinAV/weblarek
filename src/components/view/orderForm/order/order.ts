import {IEvents} from "../../../base/Events.ts";
import {ensureElement} from "../../../../utils/utils.ts";
import {TPayment} from "../../../../types";
import {OrderForm} from "../orderForm.ts";

interface IOrderData {
    payment: TPayment | null;
    address: string | null;
}

export class Order extends OrderForm<IOrderData> {
    protected cardButton: HTMLButtonElement;
    protected cashButton: HTMLButtonElement;
    protected orderButton: HTMLButtonElement;
    protected addressElement: HTMLInputElement;

    protected constructor(protected events: IEvents, container: HTMLElement) {
        super(container);

        this.cardButton = ensureElement<HTMLButtonElement>('card', this.container);
        this.cashButton = ensureElement<HTMLButtonElement>('cash', this.container);
        this.orderButton = ensureElement<HTMLButtonElement>('order__button', this.container);
        this.addressElement = ensureElement<HTMLInputElement>('address', this.container);

        this.cardButton.addEventListener('click', () => {
            this.events.emit('order:card');
        });

        this.cashButton.addEventListener('click', () => {
            this.events.emit('order:cash');
        });

        this.orderButton.addEventListener('click', () => {
            this.events.emit('order:continue')
        });

        this.addressElement.addEventListener('input', () => {
            this.events.emit('order:address');
        });
    }
}