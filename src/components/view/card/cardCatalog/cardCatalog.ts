import {ensureElement} from "../../../../utils/utils.ts";
import {CardConstructable, ICardAction, ICardWithImageView} from "../../../../types";
import {CardWithImage, ICardWithImageData} from "../cardWithImage.ts";

export class CardCatalog extends CardWithImage<ICardWithImageData> implements CardConstructable, ICardWithImageView {
    private categoryElement: HTMLElement;
    private imageElement: HTMLImageElement;
    private cardButton: HTMLButtonElement;

    constructor(container: HTMLElement, actions?: ICardAction) {
        super(container);

        this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container);
        this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
        this.cardButton = this.container as HTMLButtonElement;

        if (actions?.onClick) {
            this.cardButton.addEventListener('click', actions.onClick);
        }
    }
}