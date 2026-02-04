import {Card} from "../card.ts";
import {IEvents} from "../../../base/Events.ts";
import {ensureElement} from "../../../../utils/utils.ts";

interface ICardBasketData {
    index: number;
    id: string;
    title: string;
    price: number | null;
}

export class CardBasket extends Card<ICardBasketData> {
    protected indexElement: HTMLElement;
    protected deleteButton: HTMLButtonElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(container);

        this.indexElement = ensureElement<HTMLElement>('.basket__item-index', this.container);
        this.deleteButton = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container);

        this.deleteButton.addEventListener('click', () => {
            events.emit('card:remove', this.container.dataset);
        });
    }

    public set index(index: number) {
        this.indexElement.textContent = String(index);
    }
}