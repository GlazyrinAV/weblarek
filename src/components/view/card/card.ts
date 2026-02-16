import {ensureElement} from "../../../utils/utils.ts";
import {Component} from "../../base/Component.ts";
import {ICardView} from "../../../types";

interface ICardData {
    title: string;
    price: number | null;
}

export abstract class Card extends Component<ICardData> implements ICardView {
    protected titleElement: HTMLElement;
    protected priceElement: HTMLElement;

    protected constructor(container: HTMLElement) {
        super(container);
        this.titleElement = ensureElement<HTMLElement>('.card__title', this.container);
        this.priceElement = ensureElement<HTMLElement>('.card__price', this.container);
    }

    public set title(title: string) {
        this.titleElement.textContent = title;
    }

    public set price(price: number | null) {
        this.priceElement.textContent = (price == null ? 'Бесценно' : `${price} синапсов`);
    }
}