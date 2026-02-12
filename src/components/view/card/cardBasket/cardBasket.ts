import {Card, ICardData} from "../card.ts";
import {ensureElement} from "../../../../utils/utils.ts";
import {ICardAction} from "../../../../types";

interface ICardBasketData extends ICardData {
    index: number;
}

export class CardBasket extends Card<ICardBasketData> {
    private readonly indexElement: HTMLElement;
    private readonly deleteButton: HTMLButtonElement;

    constructor(container: HTMLElement, actions?: ICardAction) {
        super(container);

        this.indexElement = ensureElement<HTMLElement>('.basket__item-index', this.container);
        this.deleteButton = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container);

        if (actions?.onClick) {
            this.deleteButton.addEventListener('click', actions.onClick);
        }
    }

    public set index(index: number) {
        this.indexElement.textContent = String(index);
    }
}