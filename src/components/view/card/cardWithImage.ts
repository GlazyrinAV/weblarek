import {ensureElement} from "../../../utils/utils.ts";
import {categoryMap, CDN_URL} from "../../../utils/constants";
import {Card} from './card';
import {ICardWithImageView} from "../../../types";

interface ICardWithImageData extends ICardData {
    image: string;
    category: string;
    alt: string | null
}

export abstract class CardWithImage<T> extends Card<T> implements ICardWithImageView {
    private imageElement: HTMLImageElement;

    protected constructor(container: HTMLElement) {
        super(container);
        this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
    }

    public set image(src: string) {
        this.setImage(this.imageElement, `${CDN_URL}${src}`);
    }

    public set alt(alt: string) {
        this.imageElement.alt = alt;
    }

    public set category(category: string) {
        if (categoryMap[category]) {
            this.categoryElement.classList.add(categoryMap[category]);
            this.categoryElement.textContent = category;
        }
    }
}