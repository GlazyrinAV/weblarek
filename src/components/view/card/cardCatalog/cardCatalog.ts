import {Card} from "../card.ts";
import {ensureElement} from "../../../../utils/utils.ts";

interface ICardCatalogData {
    category: string;
    title: string;
    image: string;
    price: number | null;
}

export class CardCatalog extends Card<ICardCatalogData> {
    protected categoryElement: HTMLElement;
    protected imageElement: HTMLImageElement;

    protected constructor(container: HTMLElement) {
        super(container);
        this.categoryElement = ensureElement<HTMLElement>('card__price', this.container);
        this.imageElement = ensureElement<HTMLImageElement>('card__image', this.container);
    }

    public set category(category: string) {
        this.categoryElement.textContent = category;
    }

    public set image(src: string) {
        this.imageElement.src = `.${src}`;
    }
}