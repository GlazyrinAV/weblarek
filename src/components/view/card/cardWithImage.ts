import {ensureElement} from "../../../utils/utils.ts";
import {categoryMap, CDN_URL} from "../../../utils/constants";
import {Card} from './card';
import {ICardWithImageView} from "../../../types";

export abstract class CardWithImage<T> extends Card<T> implements ICardWithImageView {
    private imageElement: HTMLImageElement;
    private categoryElement: HTMLElement;

    protected constructor(container: HTMLElement) {
        super(container);

        this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container);
        this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
    }

    public set image(src: string) {
        this.setImage(this.imageElement, `${CDN_URL}${src}`);
    }

    public set alt(alt: string) {
        this.imageElement.alt = alt;
    }

    public set category(category: string) {
        Object.entries(categoryMap).forEach(([key, value]) => {
            if (key === category) {
                this.categoryElement.classList.add(value);
                this.categoryElement.textContent = category;
            }
        });
    }
}