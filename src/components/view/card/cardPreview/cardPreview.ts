import {Card} from "../card.ts";
import {IEvents} from "../../../base/Events.ts";
import {ensureElement} from "../../../../utils/utils.ts";
import {categoryMap, CDN_URL} from "../../../../utils/constants.ts";

interface ICardPreviewData {
    id: string;
    category: string;
    title: string;
    description: string;
    image: string;
    alt: string | null;
    price: number | null;
}

export class CardPreview extends Card<ICardPreviewData> {
    protected categoryElement: HTMLElement;
    protected imageElement: HTMLImageElement;
    protected descriptionElement: HTMLElement;
    protected cardButton: HTMLButtonElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(container);

        this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container);
        this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
        this.descriptionElement = ensureElement<HTMLElement>('.card__text', this.container);
        this.cardButton = ensureElement<HTMLButtonElement>('.card__button', this.container);
        this.cardButton.dataset.type = 'add';

        this.cardButton.addEventListener('click', () => {
            events.emit('card:buttonAction', this.cardButton);
        });
    }

    public set category(category: string) {
        this.categoryElement.textContent = category;
        for (const [key, value] of Object.entries(categoryMap)) {
            if (key === category) {
                this.categoryElement.classList.add(value);
            }
        }
    }

    public set image(src: string) {
        this.setImage(this.imageElement, `${CDN_URL}${src}`);
    }

    public set description(text: string) {
        this.descriptionElement.textContent = text;
    }

    public changeButtonToRemove(): void {
        this.cardButton.dataset.type = 'remove';
        this.cardButton.textContent = 'Удалить из корзины';
    }

    public disablePurchaseButton(): void {
        this.cardButton.disabled = true;
        this.cardButton.textContent = 'Недоступно';
    }
}