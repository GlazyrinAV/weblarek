import {Card} from "../card.ts";
import {ensureElement} from "../../../../utils/utils.ts";
import {IEvents} from "../../../base/Events.ts";
import {categoryMap, CDN_URL} from "../../../../utils/constants.ts";

interface ICardCatalogData {
    category: string;
    title: string;
    image: string;
    alt: string | null
    price: number | null;
}

export class CardCatalog extends Card<ICardCatalogData> {
    protected categoryElement: HTMLElement;
    protected imageElement: HTMLImageElement;
    protected cardButton: HTMLButtonElement;

    protected constructor(protected events: IEvents, container: HTMLElement) {
        super(container);
        this.categoryElement = ensureElement<HTMLElement>('card__price', this.container);
        this.imageElement = ensureElement<HTMLImageElement>('card__image', this.container);
        this.cardButton = ensureElement<HTMLButtonElement>('gallery__item', this.container);

        this.cardButton.addEventListener('click', () => {
            this.events.emit('card:open')
        })
    }

    public set category(category: string) {
        this.categoryElement.textContent = category;
        for (const [key, value] of Object.entries(categoryMap)) {
            if (key === category) {
                this.categoryElement.classList.add(value)
            }
        }
    }

    public createImage(src: string, alt?: string):void {
        this.setImage(this.imageElement, `${CDN_URL}${src}`, alt);
    }
}