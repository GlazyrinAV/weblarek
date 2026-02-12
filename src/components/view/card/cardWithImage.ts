import {ensureElement} from "../../../utils/utils.ts";
import {CDN_URL} from "../../../utils/constants";
import {Card} from './card';
import {ICardDara} from './card'

interface ICardWithImageData extends ICardData {
    image: string;
    alt: string | null
}

export abstract class CardWithImage<T> extends Card<T> {
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
}