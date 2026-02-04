import {Component} from "../../base/Component.ts";
import {ensureElement} from "../../../utils/utils.ts";
import {IValidationResult} from "../../../types";

export abstract class OrderForm<T> extends Component<T> {
    protected errorsElement: HTMLElement;

    protected constructor(container: HTMLElement) {
        super(container);

        this.errorsElement = ensureElement<HTMLElement>('.form__errors', this.container);
    }

    public set errors(errors: IValidationResult) {
        this.errorsElement.replaceChildren();

        if ((this.container as HTMLFormElement).name === 'order') {
            if (errors['payment']) {
                const element = document.createElement("p");
                element.textContent = errors['payment'];
                this.errorsElement.append(element);
            }
            if (errors['address']) {
                const element = document.createElement("p");
                element.textContent = errors['address'];
                this.errorsElement.append(element);
            }
        } else {
            if (errors['phone']) {
                const element = document.createElement("p");
                element.textContent = errors['phone'];
                this.errorsElement.append(element);
            }
            if (errors['email']) {
                const element = document.createElement("p");
                element.textContent = errors['email'];
                this.errorsElement.append(element);
            }
        }
    }
}