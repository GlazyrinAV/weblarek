import {Component} from "../../base/Component.ts";
import {ensureElement} from "../../../utils/utils.ts";
import {IValidationResult} from "../../../types";
import {IEvents} from "../../base/Events.ts";

export interface IOrderForm {
    errors: Partial<IValidationResult>;
}

export abstract class OrderForm<T> extends Component<T> implements IOrderForm {
    protected errorsElement: HTMLElement;
    protected orderButton: HTMLButtonElement;

    protected constructor(protected events: IEvents, container: HTMLElement) {
        super(container);

        this.errorsElement = ensureElement<HTMLElement>('.form__errors', this.container);
        this.orderButton = ensureElement<HTMLButtonElement>('button[type="submit"]', this.container);
    }

    public set errors(errors: Partial<IValidationResult>) {
        this.errorsElement.replaceChildren();
        let result = true;

        Object.values(errors).forEach(error => {
            if (error) {
                const element = document.createElement("p");
                element.textContent = error;
                this.errorsElement.append(element);
                result = false;
            }
        });

        result ? this.activeButton() :
            this.deActiveButton();
    }

    private activeButton(): void {
        this.orderButton.disabled = false;
    }

    private deActiveButton(): void {
        this.orderButton.disabled = true;
    }
}