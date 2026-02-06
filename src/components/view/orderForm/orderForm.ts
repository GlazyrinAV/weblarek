import {Component} from "../../base/Component.ts";
import {ensureElement} from "../../../utils/utils.ts";
import {IValidationResult} from "../../../types";
import {IEvents} from "../../base/Events.ts";

export abstract class OrderForm<T> extends Component<T> {
    protected errorsElement: HTMLElement;
    protected orderButton: HTMLButtonElement;

    protected constructor(protected events: IEvents, container: HTMLElement) {
        super(container);

        this.errorsElement = ensureElement<HTMLElement>('.form__errors', this.container);
        this.orderButton = ensureElement<HTMLButtonElement>('button[type="submit"]', this.container);
    }

    public set errors(errors: IValidationResult) {
        this.errorsElement.replaceChildren();

        if ((this.container as HTMLFormElement).name === 'order') {
            this.checkErrors([errors['payment'], errors['address']]);
        } else {
            this.checkErrors([errors['phone'], errors['email']]);
        }
    }

    public activeButton(): void {
        this.orderButton.disabled = false;
    }

    public deActiveButton(): void {
        this.orderButton.disabled = true;
    }

    private checkErrors(errors: string[]): void {
        errors.forEach(error => {
            if (error) {
                const element = document.createElement("p");
                element.textContent = error;
                this.errorsElement.append(element);
            }
        });

        errors.filter(error => error != null).length === 0 ?
            this.events.emit('order:validationSuccess', this.container) :
            this.events.emit('order:validationFail', this.container);
    }
}