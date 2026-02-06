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
    protected addressElement: HTMLInputElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(events, container);

        this.cardButton = ensureElement<HTMLButtonElement>('button[name="card"]', this.container);
        this.cashButton = ensureElement<HTMLButtonElement>('button[name="cash"]', this.container);
        this.addressElement = ensureElement<HTMLInputElement>('input[name="address"]', this.container);

        this.cardButton.addEventListener('click', () => {
            this.events.emit('order:card');
        });

        this.cashButton.addEventListener('click', () => {
            this.events.emit('order:cash');
        });

        this.orderButton.addEventListener('click', (event) => {
            event.preventDefault();
            this.events.emit('contacts:new')
        });

        function debounce<T extends Function>(func: T, delay: number): () => void {
            let timeoutId: ReturnType<typeof setTimeout>;
            return function (this: any) {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this);
                }, delay);
            };
        }

        this.addressElement.addEventListener('input', debounce(() => {
            this.events.emit('order:address', this.addressElement);
        }, 300));
    }

    public set address(address: string) {
        if (address) {
            this.addressElement.value = address;
        } else {
            this.addressElement.value = "";
        }
    }

    public set payment(payment: TPayment) {
        if (payment === 'CASH') {
            this.cardButton.classList.remove('button_alt-active');
            this.cashButton.classList.add('button_alt-active');
        } else if (payment === 'CARD') {
            this.cashButton.classList.remove('button_alt-active');
            this.cardButton.classList.add('button_alt-active');
        }
    }
}