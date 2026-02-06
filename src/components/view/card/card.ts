import {ensureElement} from "../../../utils/utils.ts";
import {Component} from "../../base/Component.ts";

export abstract class Card<T> extends Component<T> {
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
        this.priceElement.textContent = price ? `${price} синапсов` : 'Бесценно';
    }
}