import {Component} from "../../base/Component.ts";
import {ensureElement} from "../../../utils/utils.ts";
import {IGalleryView} from "../../../types";

interface IGalleryData {
    catalog: HTMLElement[];
}

export class Gallery extends Component<IGalleryData> implements IGalleryView {
    private catalogElement: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);

        this.catalogElement = ensureElement<HTMLElement>('.gallery', container);
    }

    public set catalog(items: HTMLElement[]) {
        items.forEach(item => {
            this.catalogElement.append(item);
        });

    }
}