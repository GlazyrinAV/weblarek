import {ensureElement} from "../../../../utils/utils.ts";
import {CardConstructable, ICardAction, ICardPreviewView} from "../../../../types";
import {CardWithImage, ICardWithImageData} from "../cardWithImage.ts";

interface ICardPreviewData extends ICardWithImageData {
    description: string;
}

export class CardPreview extends CardWithImage<ICardPreviewData> implements CardConstructable, ICardPreviewView {
    private categoryElement: HTMLElement;
    private imageElement: HTMLImageElement;
    private descriptionElement: HTMLElement;
    private cardButton: HTMLButtonElement;

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