import {Component} from "../../base/Component.ts";
import {IEvents} from "../../base/Events.ts";
import {ensureElement} from "../../../utils/utils.ts";
import {IOrderResultView} from "../../../types";
import {EventsType} from "../../base/EventsType";

interface IOrderResult {
    total: number;
}

export class OrderResult extends Component<IOrderResult> implements IOrderResultView {
    private descriptionElement: HTMLElement;
    private closeButton: HTMLButtonElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(container);

        this.descriptionElement = ensureElement<HTMLElement>('.order-success__description', this.container);
        this.closeButton = ensureElement<HTMLButtonElement>('.order-success__close', this.container);

        this.closeButton.addEventListener('click', (event) => {
            event.preventDefault();
            events.emit(EventsType.ResultOkButton);
        });
    }

    public set total(total: number) {
        this.descriptionElement.textContent = `Списано ${total} синапсов`;
    }
}