import {Component} from "../../base/Component.ts";
import {IEvents} from "../../base/Events.ts";
import {ensureElement} from "../../../utils/utils.ts";

interface IModalData {
    content: HTMLElement;
}

export class Modal extends Component<IModalData> {
    private closeButton: HTMLButtonElement;
    private modalElement: HTMLElement;
    private contentElement: HTMLElement;

    constructor(private events: IEvents, container: HTMLElement) {
        super(container);

        this.closeButton = ensureElement<HTMLButtonElement>('.modal__close', this.container);
        this.modalElement = ensureElement<HTMLElement>('.modal', this.container);
        this.contentElement = ensureElement<HTMLElement>('.modal__content', this.container);

        this.closeButton.addEventListener('click', () => {
            this.events.emit('modal:closeButton');
        });

        this.modalElement.addEventListener('click', (event) => {
            const element = event.target as HTMLElement;
            if (element.id === 'modal-container') {
                this.events.emit('modal:closeButton');
            }
        })
    }

    public set content(content: HTMLElement) {
        this.contentElement.append(content);
        this.modalElement.classList.add('modal_active');
    }

    public closeModal() {
        this.contentElement.replaceChildren();
        this.modalElement.classList.remove('modal_active');
    }

    public clear() {
        this.contentElement.replaceChildren();
    }
}