import {Component} from "../../base/Component.ts";
import {ensureElement} from "../../../utils/utils.ts";

interface IGalleryData {
    catalog: HTMLElement[];
}

export class Gallery extends Component<IGalleryData> {
    protected catalogElement: HTMLElement;

    protected constructor(container: HTMLElement) {
        super(container);

        this.catalogElement = ensureElement<HTMLElement>('gallery', container);
    }

    public catalog(items: HTMLElement[]) {
        let list: HTMLUListElement = document.createElement('ul');
        items.forEach(item => {
            let listItem = document.createElement('li');
            listItem.classList.add('gallery__item')
            listItem.append(item);
            list.append(listItem);
        });
    }
}