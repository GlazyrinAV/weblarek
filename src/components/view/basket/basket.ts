import {Component} from "../../base/Component.ts";
import {IEvents} from "../../base/Events.ts";
import {ensureElement} from "../../../utils/utils.ts";

interface IBasketData {
    content: HTMLElement[];
    total: string;
}

export class Basket extends Component<IBasketData> {
    private basketElement: HTMLElement;
    private totalPriceElement: HTMLElement;
    private makeOderButton: HTMLButtonElement;

    constructor(private events: IEvents, container: HTMLElement) {
        super(container);

        this.basketElement = ensureElement<HTMLElement>('.basket__list', this.container);
        this.totalPriceElement = ensureElement<HTMLElement>('.basket__price', this.container);
        this.makeOderButton = ensureElement<HTMLButtonElement>('.basket__button', this.container);

        this.makeOderButton.addEventListener('click', () => {
            this.events.emit('order:new');
        });
    }

    public set content(items: HTMLElement[]) {
        if (items.length > 0) {
            items.forEach(item => {
                this.basketElement.append(item);
            })
        }

        this.makeOderButton.disabled = items.length === 0;
    }

    public set total(total: number) {
        this.totalPriceElement.textContent = String(total);
    }
}