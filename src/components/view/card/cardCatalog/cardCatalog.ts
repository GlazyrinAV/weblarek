import {Card} from "../card.ts";
import {ensureElement} from "../../../../utils/utils.ts";
import {categoryMap, CDN_URL} from "../../../../utils/constants.ts";
import {ICardAction} from "../../../../types";

interface ICardCatalogData {
    category: string;
    title: string;
    image: string;
    alt: string | null
    price: number | null;
}

export class CardCatalog extends Card<ICardCatalogData> {
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

    public set category(category: string) {
        this.categoryElement.textContent = category;
        for (const [key, value] of Object.entries(categoryMap)) {
            if (key === category) {
                this.categoryElement.classList.add(value)
            }
        }
    }

    public set image(src: string) {
        this.setImage(this.imageElement, `${CDN_URL}${src}`);
    }
}