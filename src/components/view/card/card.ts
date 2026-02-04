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

    public set price(price: number) {
        let text: string = '';
        if (price) {
            text = `${price} синапсов`;
        } else {
            text = 'Бесценно';
        }
        this.priceElement.textContent = text;
    }

    public set id(id: string) {
        this.container.dataset.id = id;
    }
}