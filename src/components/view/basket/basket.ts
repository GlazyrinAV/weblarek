import {Component} from "../../base/Component.ts";
import {IEvents} from "../../base/Events.ts";
import {ensureElement} from "../../../utils/utils.ts";

interface IBasketData {
    content: HTMLElement[];
    total: string;
}

export class Basket extends Component<IBasketData> {
    protected basketElement: HTMLElement;
    protected totalPriceElement: HTMLElement;
    protected makeOderButton: HTMLButtonElement;

    constructor(protected events: IEvents, container: HTMLElement) {
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
                let basketItem = document.createElement('li');
                basketItem.append(item);
                this.basketElement.append(item);
            })
        } else {
            this.makeOderButton.disabled = true;
        }

    }

    public set total(total: number) {
        this.totalPriceElement.textContent = String(total);
    }
}