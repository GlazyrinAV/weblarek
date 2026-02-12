import {ensureElement} from "../../../../utils/utils.ts";
import {categoryMap} from "../../../../utils/constants.ts";
import {ICardAction} from "../../../../types";
import {CardWithImage, ICardWithImageData} from "../cardWithImage.ts";

interface ICardPreviewData extends ICardWithImageData {
    category: string;
    description: string;
}

export class CardPreview extends CardWithImage<ICardPreviewData> {
    private readonly categoryElement: HTMLElement;
    private readonly descriptionElement: HTMLElement;
    private readonly cardButton: HTMLButtonElement;

    constructor(container: HTMLElement, actions?: ICardAction) {
        super(container);

        this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container);
        this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
        this.descriptionElement = ensureElement<HTMLElement>('.card__text', this.container);
        this.cardButton = ensureElement<HTMLButtonElement>('.card__button', this.container);

        if (actions?.onClick) {
            this.cardButton.addEventListener('click', actions.onClick);
        }
    }

    public set category(category: string) {
        this.categoryElement.textContent = category;
        for (const [key, value] of Object.entries(categoryMap)) {
            if (key === category) {
                this.categoryElement.classList.add(value);
            }
        }
    }

    public set description(text: string) {
        this.descriptionElement.textContent = text;
    }

    public changeButtonToRemove(): void {
        this.cardButton.textContent = 'Удалить из корзины';
    }

    public disablePurchaseButton(): void {
        this.cardButton.disabled = true;
        this.cardButton.textContent = 'Недоступно';
    }
}