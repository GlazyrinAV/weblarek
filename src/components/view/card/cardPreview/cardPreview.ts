import {Card} from "../card.ts";
import {IEvents} from "../../../base/Events.ts";
import {ensureElement} from "../../../../utils/utils.ts";

interface ICardPreviewData {
    category: string;
    title: string;
    description: string;
    image: string;
    price: number | null;
}

export class CardPreview extends Card<ICardPreviewData> {
    protected categoryElement: HTMLElement;
    protected imageElement: HTMLImageElement;
    protected descriptionElement: HTMLElement;
    protected cartButton: HTMLButtonElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(container);

        this.categoryElement = ensureElement<HTMLElement>('card__price', this.container);
        this.imageElement = ensureElement<HTMLImageElement>('card__image', this.container);
        this.descriptionElement = ensureElement<HTMLElement>('card__text', this.container);
        this.cartButton = ensureElement<HTMLButtonElement>('card__button', this.container);

        this.cartButton.addEventListener('click', () => {
            events.emit('card:addToCart');
        })
    }

    public set category(category: string) {
        this.categoryElement.textContent = category;
    }

    public set image(src: string) {
        this.imageElement.src = `.${src}`;
    }

    public set description(text: string) {
        this.descriptionElement.textContent = text;
    }
}