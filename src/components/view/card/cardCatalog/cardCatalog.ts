import {ICardAction, ICardWithImageData, ICardWithImageView} from "../../../../types";
import {CardWithImage} from "../cardWithImage.ts";

export class CardCatalog extends CardWithImage<ICardWithImageData> implements ICardWithImageView {
    private cardButton: HTMLButtonElement;

    constructor(container: HTMLElement, actions?: ICardAction) {
        super(container);

        this.cardButton = this.container as HTMLButtonElement;

        if (actions?.onClick) {
            this.cardButton.addEventListener('click', actions.onClick);
        }
    }
}