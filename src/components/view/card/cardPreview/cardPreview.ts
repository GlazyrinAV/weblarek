import {ensureElement} from "../../../../utils/utils.ts";
import {ICardAction, ICardPreviewData, ICardPreviewView} from "../../../../types";
import {CardWithImage} from "../cardWithImage"

export class CardPreview extends CardWithImage<ICardPreviewData> implements ICardPreviewView {
    private descriptionElement: HTMLElement;
    private cardButton: HTMLButtonElement;

    constructor(container: HTMLElement, actions?: ICardAction) {
        super(container);

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