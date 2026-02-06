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

        this.emailElement = ensureElement<HTMLInputElement>('input[name="email"]', this.container);
        this.phoneElement = ensureElement<HTMLInputElement>('input[name="phone"]', this.container);

        function debounce<T extends Function>(func: T, delay: number): () => void {
            let timeoutId: ReturnType<typeof setTimeout>;
            return function (this: any) {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this);
                }, delay);
            };
        }

        this.emailElement.addEventListener('input', debounce(() => {
            this.events.emit('order:email', this.emailElement);
        }, 300));

        this.emailElement.addEventListener('input', debounce(() => {
            this.events.emit('order:phone', this.phoneElement);
        }, 300));

        this.orderButton.addEventListener('click', (event) => {
            event.preventDefault();
            this.events.emit('order:send');
        });
    }
}