import {Component} from "../../base/Component.ts";
import {IEvents} from "../../base/Events.ts";
import {ensureElement} from "../../../utils/utils.ts";

interface IBasketData {
    content: HTMLElement[];
    total: number;
}

export class Basket extends Component<IBasketData> {
    protected basketElement: HTMLUListElement;
    protected totalPriceElement: HTMLElement;
    protected makeOderButton: HTMLButtonElement;

    protected constructor(protected events: IEvents, container: HTMLElement) {
        super(container);

        this.basketElement = ensureElement<HTMLUListElement>('basket__list', this.container);
        this.totalPriceElement = ensureElement<HTMLElement>('basket__price', this.container);
        this.makeOderButton = ensureElement<HTMLButtonElement>('basket__button', this.container);

        this.makeOderButton.addEventListener('click', () => {
            this.events.emit('order:create');
        });
    }

    public set basket(items: HTMLElement[]) {
        items.forEach(item => {
            let basketItem = document.createElement('li');
            basketItem.append(item);
            basketItem.classList.add('basket__item');
            this.basketElement.append(basketItem);
        })
    }

    public set total(total: number) {
        this.totalPriceElement.textContent = String(total);
    }
}