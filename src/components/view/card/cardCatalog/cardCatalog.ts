import {Card} from "../card.ts";
import {ensureElement} from "../../../../utils/utils.ts";
import {categoryMap, CDN_URL} from "../../../../utils/constants.ts";
import {ICardAction} from "../../../../types";
import {CardWithImage} from "../cardWithImage.ts";
import {ICardWithImageData} from '../cardWithImage.ts'

export class CardCatalog extends CardWithImage<ICardWithImageData> {
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