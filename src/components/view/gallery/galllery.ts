import {Component} from "../../base/Component.ts";
import {ensureElement} from "../../../utils/utils.ts";

interface IGalleryData {
    catalog: HTMLElement[];
}

export class Gallery extends Component<IGalleryData> {
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