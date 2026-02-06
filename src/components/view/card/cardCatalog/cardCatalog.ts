import {Card} from "../card.ts";
import {ensureElement} from "../../../../utils/utils.ts";
import {IEvents} from "../../../base/Events.ts";
import {categoryMap, CDN_URL} from "../../../../utils/constants.ts";

interface ICardCatalogData {
    id: string;
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

    constructor(protected events: IEvents, container: HTMLElement) {
        super(container);

        this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container);
        this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
        this.cardButton = this.container as HTMLButtonElement;

        this.cardButton.addEventListener('click', () => {
            this.events.emit('card:open', this.container.dataset)
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

    public set image(src: string) {
        this.setImage(this.imageElement, `${CDN_URL}${src}`);
    }
}