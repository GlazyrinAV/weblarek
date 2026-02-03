import {Component} from "../../base/Component.ts";
import {IEvents} from "../../base/Events.ts";
import {ensureElement} from "../../../utils/utils.ts";

interface IModalData {
    content: HTMLElement;
}

export class Modal extends Component<IModalData> {
    protected closeButton: HTMLButtonElement;
    protected contentElement: HTMLElement;

    protected constructor(protected events: IEvents, container: HTMLElement) {
        super(container);

        this.closeButton = ensureElement<HTMLButtonElement>('modal__close', this.container);
        this.contentElement = ensureElement<HTMLElement>('modal__content', this.container);

        this.closeButton.addEventListener('click', () => {
            this.events.emit('modal:close');
        });
    }

    public set content(content: HTMLElement) {
        this.contentElement.append(content);
    }
}