import {ensureElement} from "../../../utils/utils.ts";
import {Component} from "../../base/Component.ts";
import {IEvents} from "../../base/Events.ts";
import {IHeaderView} from "../../../types";
import {EventsType} from "../../base/EventsType";

interface IHeaderData {
    counter: number;
}

export class Header extends Component<IHeaderData> implements IHeaderView {
    private basketButton: HTMLButtonElement;
    private counterElement: HTMLElement;

    constructor(private events: IEvents, container: HTMLElement) {
        super(container);
        this.basketButton = ensureElement<HTMLButtonElement>('.header__basket', this.container);
        this.counterElement = ensureElement<HTMLElement>('.header__basket-counter', this.container);

        this.basketButton.addEventListener('click', () => {
            this.events.emit(EventsType.OpenBasket);
        });
    }

    public set counter(value: number) {
        this.counterElement.textContent = String(value);
    }
}